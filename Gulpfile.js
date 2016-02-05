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
  develop:             './build/develop',
  release:             './build/release',

  application_infile:  'app/Application.jsx',
  vendortools_infile:  'app/Packages.jsx',
  application_outfile: 'application.js',
  vendortools_outfile: 'vendors.js'
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
  vendortools: {
    js:  merge(watchify.args, { debug: false }),
    css: merge(watchify.args, { debug: false })
  }
}

var EXTERNALS = Object.keys(package_json.dependencies).map(function(dependency) {
  return dependency;
});

var bundlers = {
  'js:Application': browserify(paths.application_infile, options.application.js)
    .plugin(resolutions, '*')
    .plugin(function(bundle) {
      EXTERNALS.forEach(function(tool) {
        bundle.external(tool);
      });
    })
    .transform(babelify, { presets: ['es2015', 'react']})
, 'js:VendorTools': browserify(paths.vendortools_infile, options.vendortools.js)
    .plugin(resolutions, '*')
    .plugin(function(bundle) {
      EXTERNALS.forEach(function(tool) {
        bundle.require(tool);
      })
    })
, 'css:Application': browserify(paths.application_css_start, options.application.css)
, 'css:VendorTools': browserify(paths.vendortools_css_start, options.vendortools.css)
};

var build_js = function(bundler, infile, outfile) {
  var bundleTimer = duration('Application JS bundle time');
  return bundler
    .bundle()
    .on('error', mapError)     // report all errors to console
    .pipe(source(infile))      // start with main app .jsx file
    .pipe(buffer())            // convert to a gulp pipeline
    .pipe(rename(outfile))     // rename the output file
    .pipe(gulp.dest(paths.develop + '/js'))
    .pipe(notify({ message: 'DEVELOP: <%= file.relative %> created.' }))
    .pipe(streamify(uglify())) // uglify/minify the output
    .pipe(gulp.dest(paths.release + '/js'))
    .pipe(notify({ message: 'RELEASE: <%= file.relative %> created.' }))
    .pipe(bundleTimer)         // output build timing
    .pipe(livereload())        // reload the view in the browser
};

// Build file outputs
bundlers['js:Application'].run = build_js.bind(
  this, 
  bundlers['js:Application'], 
  paths.application_infile, 
  paths.application_outfile
);
bundlers['js:VendorTools'].run = build_js.bind(
  this, 
  bundlers['js:VendorTools'],
  paths.vendortools_infile,
  paths.vendortools_outfile
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