'use strict';
var _           = require('lodash'),                 // Lodash
    gulp        = require('gulp'),                   // Base gulp package
    babelify    = require('babelify'),               // Used to convert ES6 & JSX to ES5
    browserify  = require('browserify'),             // Providers "require" support, CommonJS
    buffer      = require('vinyl-buffer'),           // Vinyl stream support
    chalk       = require('chalk'),                  // Allows for coloring for logging
    concat      = require('gulp-concat'),            // Concatenates multiple files into one
    cssmin      = require('gulp-cssmin'),            // Minifies CSS files
    del         = require('del'),                    // Deletes files / folders
    duration    = require('gulp-duration'),          // Time aspects of your gulp process
    fs          = require('fs'),                     // Node file system object
    gulpif      = require('gulp-if'),                // Allows conditionals within gulp statements
    gutil       = require('gulp-util'),              // Provides gulp utilities, including logging and beep
    merge       = require('utils-merge'),            // Object merge tool
    notify      = require('gulp-notify'),            // Provides notification to both the console and Growel
    rename      = require('gulp-rename'),            // Rename sources
    resolutions = require('browserify-resolutions'), // Resolve duplicate dependencies
    sass        = require('gulp-sass'),              // Compile .scss CSS files
    sass_glob   = require('gulp-sass-glob'),         // SCSS with wildcard @imports
    source      = require('vinyl-source-stream'),    // Vinyl stream support
    streamify   = require('gulp-streamify'),         // Creates gulp streams
    uglify      = require('gulp-uglify')             // Minifies JavaScript
;

var paths = {
  develop_folder:  './build/develop',
  release_folder:  './build/release',

  app_js_develop:  'app/Application.jsx',
  app_js_release:  'js/application.js',

  app_css_develop: [
    'styles/Application.scss',
    'styles/**/*.{css,scss}',
    '!styles/Dependencies.scss'
  ],
  app_css_release: 'styles/application.css',

  pkg_js_develop:  'app/Packages.jsx',
  pkg_js_release:  'js/dependencies.js',

  pkg_css_develop: 'styles/Dependencies.scss',
  pkg_css_release: 'styles/dependencies.css',

  dependencies: './app/dependencies/'
};

var DEPENDENCIES = Object.keys(require('./package.json').dependencies)
  .map(function(dependency) {
    return dependency;
  })
  .concat(fs.readdirSync(paths.dependencies).map(function(filename) {
    if (_(filename).endsWith('.js') && fs.statSync(paths.dependencies + filename).isFile())
      return (paths.dependencies + filename);
  }))
;

var assetMap = [
  { name: 'HTML Pages',   src: './app/**/*.html',             dest: ''        },
  { name: 'Font Assets',  src: './fontello/font/**/*',        dest: '/font'   },
  { name: 'Image Assets', src: './images/**/*.{gif,jpg,png}', dest: '/images' },
];
var build_assets = function() {
  assetMap.forEach(function(mapping) {
    gulp.src(mapping.src)
      .pipe(gulp.dest(paths.develop_folder + (mapping.dest || '')))
      .pipe(notify({ onLast: true, message: report_file.bind(this, 'DEVELOP', mapping.name) }))
      .pipe(gulp.dest(paths.release_folder + (mapping.dest || '')))
      .pipe(notify({ onLast: true, message: report_file.bind(this, 'RELEASE', mapping.name) }))
    ;
  });
};

var build_js = function(bundler, infile, outfile, minify) {
  return bundler
    .plugin(resolutions, '*')
    .bundle()
    .on('error', mapError)     // report all errors to console
    .pipe(source(infile))      // start with main .jsx file
    .pipe(buffer())            // convert to a gulp pipeline
    .pipe(rename(outfile))     // rename the output file
    .pipe(gulp.dest(paths.develop_folder))
    .pipe(notify({ onLast: true, message: report_file.bind(this, 'DEVELOP', outfile) }))
    .pipe(gulpif(minify, uglify()))            // uglify/minify the output
    .pipe(gulp.dest(paths.release_folder))
    .pipe(notify({ onLast: true, message: report_file.bind(this, 'RELEASE', outfile) }))
  ;
};
var build_sass = function(infile, outfile) {
  return gulp.src(infile)
    .pipe(sass_glob())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(outfile))
    .pipe(gulp.dest(paths.develop_folder))
    .pipe(notify({ onLast: true, message: report_file.bind(this, 'DEVELOP', outfile) }))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.release_folder))
    .pipe(notify({ onLast: true, message: report_file.bind(this, 'RELEASE', outfile) }))
  ;
};
function report_file(environment, filename) {
  console.log(chalk.red(environment + ': ') + chalk.cyan(filename) + chalk.red(' created.'))
}

var bundlers = {
  'js:Application': browserify(paths.app_js_develop, { debug: true })
    .plugin(function(bundle) {
      // remove all dependencies from the Application.js build
      DEPENDENCIES.forEach(function(tool) {
        bundle.external(tool);
      });
    })
    .transform(babelify, { presets: ['es2015', 'react']})
, 'js:Dependencies': browserify(paths.pkg_js_develop, { debug: false })
    .plugin(function(bundle) {
      // add all dependencies to the dependencies.js build
      DEPENDENCIES.forEach(function(tool) {
        bundle.require(tool);
      })
    })
};
bundlers['js:Application'].run = build_js.bind(
  this, bundlers['js:Application'], paths.app_js_develop, paths.app_js_release, true
);
bundlers['js:Dependencies'].run = build_js.bind(
  this, bundlers['js:Dependencies'], paths.pkg_js_develop, paths.pkg_js_release, false
);

gulp.task('build', ['clean'], function() {
  return gulp.start(['build_assets', 'build_js', 'build_app_css', 'build_pkg_css']);
});
gulp.task('build_assets', build_assets);
gulp.task('build_js', function() {
  for (var name in bundlers) {
    if (typeof bundlers[name].run != 'function') continue;

    bundlers[name].run();
  }
});
gulp.task('build_app_css', function() {
  return build_sass(paths.app_css_develop, paths.app_css_release);
});
gulp.task('build_pkg_css', function() {
  return build_sass(paths.pkg_css_develop, paths.pkg_css_release);
});

gulp.task('clean', function() {
  return del(['build/**/*', 'build']);
});
gulp.task('listen', ['build'], function() {
  gulp.watch(['app/Application.jsx', 'app/**/*.js', '!app/dependencies/*.js'], [bundlers['js:Application'].run]);
  gulp.watch(['app/Dependencies.jsx', 'app/dependencies/*.js'], [bundlers['js:Dependencies'].run]);
  assetMap.forEach(function(mapping) {
    gulp.watch(mapping.src, build_assets);
  });
  gulp.watch(['app/**/*.{jsx,js}'], ['build_js']);
  gulp.watch(['styles/**/*.{css,scss}', '!styles/Dependencies.scss'], ['build_app_css']);
  gulp.watch(['styles/Dependencies.scss'], ['build_pkg_css']);
});

gulp.task('default', ['listen']);

function mapError(err) {
  if (err.filename) { // General error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.filename.replace(__dirname, ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber || err.line)
      + ', ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.cyan(err.description || err.message)
    );
  } else { // Browserify error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.message)
    );
  }
}
