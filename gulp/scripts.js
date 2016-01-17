
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var conf = require('./conf');

// Concatenate & Minify JS

gulp.task('scripts', function() {
	return gulp.src(conf.paths.src + '/app/js/*.js')
			//.pipe(concat('all.js'))
			//.pipe(gulp.dest('dist'))
			//.pipe(rename('all.min.js'))
			//.pipe(uglify())
			.pipe(gulp.dest(conf.paths.tmp + '/serve/js'));
});