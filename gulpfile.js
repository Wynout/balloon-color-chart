/*
|------------------------------------------------------------------------------
| Gulp.js - the streaming build system                              gulpfile.js
|------------------------------------------------------------------------------
*/
var autoprefixer = require('gulp-autoprefixer');
var ecstatic     = require('ecstatic');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var http         = require('http');
var less         = require('gulp-less');
var lr           = require('tiny-lr');
var path         = require('path');
var plumber      = require('gulp-plumber'); // this plugin is fixing issue with Node Streams piping
var tlr          = lr();
var livereload   = function (evt, filepath) {

    tlr.changed({
        body: {
            files: path.relative(__dirname, filepath)
        }
    });
};


/**
 * Styles task
 */
gulp.task('styles', function () {

    return gulp.src('./less/main.less')
        .pipe(plumber())
        .pipe(less({
            compress: false,
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./css'));
});


/**
 * Default task
 */
gulp.task('default', function () {

    http.createServer(ecstatic({root: __dirname})).listen(3000);
    gutil.log(gutil.colors.blue('HTTP server listening on port 3000'));
    tlr.listen(35729);
    gutil.log(gutil.colors.blue('Livereload server listening on port 35729'));
    gulp.watch('less/**', ['styles'])._watcher.on('all', livereload);
});
