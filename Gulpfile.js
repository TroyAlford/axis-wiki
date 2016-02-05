'use strict';
var gulp        = require('gulp'),                   // Base gulp package
    babelify    = require('babelify'),               // Used to convert ES6 & JSX to ES5
    browserify  = require('browserify'),             // Providers "require" support, CommonJS
    buffer      = require('vinyl-buffer'),           // Vinyl stream support
    chalk       = require('chalk'),                  // Allows for coloring for logging
    del         = require('del'),                    // Deletes files / folders
    duration    = require('gulp-duration'),          // Time aspects of your gulp process
    gutil       = require('gulp-util'),              // Provides gulp utilities, including logging and beep
    livereload  = require('gulp-livereload'),        // Livereload support for the browser
    merge       = require('utils-merge'),            // Object merge tool
    notify      = require('gulp-notify'),            // Provides notification to both the console and Growel
    rename      = require('gulp-rename'),            // Rename sources
    resolutions = require('browserify-resolutions'), // Resolve duplicate dependencies
    source      = require('vinyl-source-stream'),    // Vinyl stream support
    streamify   = require('gulp-streamify'),         // Creates gulp streams
    uglify      = require('gulp-uglify'),            // Minifies JavaScript
    watchify    = require('watchify')                // Watchify for source changes
;

var package_json = require('./package.json');

var paths = {
  develop_folder:  './build/develop',
  release_folder:  './build/release',

  app_js_develop:  'app/Application.jsx',
  app_js_release:  'js/application.js',

  app_css_develop: 'styles/Application.sass',
  app_css_release: 'styles/application.css',

  pkg_js_develop:  'app/Packages.jsx',
  pkg_js_release:  'js/dependencies.js',

  pkg_css_develop: 'styles/Dependencies.sass',
  pkg_css_release: 'styles/dependencies.css'
};

function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name))
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + '& ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description);
  } else {
    // Browserify error
    gutil.log(chalk.red(err.name))
      + ': ' + chalk.yellow(err.message);
  }
}

var options = {
  application: {
    js:  merge(watchify.args, { debug: true  }),
    css: merge(watchify.args, { debug: true  })
  },
  dependencies: {
    js:  merge(watchify.args, { debug: false }),
    css: merge(watchify.args, { debug: false })
  }
}

var DEPENDENCIES = Object.keys(package_json.dependencies).map(function(dependency) {
  return dependency;
});

var bundlers = {
  'js:Application': browserify(paths.app_js_develop, options.application.js)
    .plugin(resolutions, '*')
    .plugin(function(bundle) {
      // remove all dependencies from the Application.js build
      DEPENDENCIES.forEach(function(tool) {
        bundle.external(tool);
      });
    })
    .transform(babelify, { presets: ['es2015', 'react']})
, 'js:Dependencies': browserify(paths.pkg_js_develop, options.dependencies.js)
    .plugin(resolutions, '*')
    .plugin(function(bundle) {
      // add all dependencies to the dependencies.js build
      DEPENDENCIES.forEach(function(tool) {
        bundle.require(tool);
      })
    })
, 'css:Application': browserify(paths.app_css_develop, options.application.css)
, 'css:Dependencies': browserify(paths.pkg_css_develop, options.dependencies.css)
};

var build_js = function(bundler, infile, outfile) {
  var bundleTimer = duration('Application JS bundle time');
  return bundler
    .bundle()
    .on('error', mapError)     // report all errors to console
    .pipe(source(infile))      // start with main app .jsx file
    .pipe(buffer())            // convert to a gulp pipeline
    .pipe(rename(outfile))     // rename the output file
    .pipe(gulp.dest(paths.develop_folder))
    .pipe(notify({ message: 'DEVELOP: <%= file.relative %> created.' }))
    .pipe(streamify(uglify())) // uglify/minify the output
    .pipe(gulp.dest(paths.release_folder))
    .pipe(notify({ message: 'RELEASE: <%= file.relative %> created.' }))
    .pipe(bundleTimer)         // output build timing
    .pipe(livereload())        // reload the view in the browser
};

// Build file outputs
bundlers['js:Application'].run = build_js.bind(
  this, 
  bundlers['js:Application'], 
  paths.app_js_develop, 
  paths.app_js_release
);
bundlers['js:Dependencies'].run = build_js.bind(
  this, 
  bundlers['js:Dependencies'],
  paths.pkg_js_develop,
  paths.pkg_js_release
);

gulp.task('clean', function() {
  return del(['build/**/*', 'build']);
});

gulp.task('build', function() {
  for (var name in bundlers) {
    if (typeof bundlers[name].run != 'function') continue;

    bundlers[name].run();
  }
});

gulp.task('listen', function() {
  livereload.listen(); // start livereload server

  for (var name in bundlers) {
    var bundler = bundlers[name]
      .plugin(watchify, { ignoreWatch: ['**/node_modules/**', '**/bower_components/**'] });

    if (typeof bundler.run != 'function') continue;

    bundler.on('update', function() {
      bundler.run(); // Re-run bundle on source updates
    })
  }
});

gulp.task('default', ['clean', 'build', 'listen']);