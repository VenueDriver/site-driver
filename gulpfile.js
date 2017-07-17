'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const config = require('./config/settings');
const sass = require('gulp-sass');


gulp.task('default', ['browser-sync','sass:watch'], function () {
});

gulp.task('sass', function () {
  return gulp.src('./public/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:"+config.port,
        files: ["public/**/*.*","front/**/*.*"],
        browser: "google chrome",
        port: 1234
	});
});
gulp.task('nodemon', function (cb) {

	let started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
