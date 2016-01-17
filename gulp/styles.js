'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var debug = require('gulp-debug');
var inject = require('gulp-inject');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {
	var sassOptions = {
		style: 'expanded'
	};

	var copyFiles = gulp.src([
			path.join(conf.paths.src, '/app/css/*.css')
	]);

	copyFiles
			.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/css')));

	var injectFiles = gulp.src([
		path.join(conf.paths.src, '/app/css/*.css')


	], {read: false})
	var options = {
		transform: function (filepath) {
			filepath = filepath.replace('' + conf.paths.src + '/app/', '');
			filepath = filepath.replace(/^\//, '');

			return '@import "' + filepath + '";';
		}
	}
	var injectOptions = {
		transform: function (filePath) {
			filePath = filePath.replace(conf.paths.src + '/app/', '');
			return '@import "' + filePath + '";';
		},
		starttag: '<!-- inject:css -->',
		endtag: '<!-- endinjector -->',
		addRootSlash: false
	};



	var target = gulp.src([
		path.join(conf.paths.src, '/app/index.html')
	]);

	return target.pipe(inject(injectFiles, options))
			.pipe(debug({title: "styles:"}))
			.pipe(gulp.dest(conf.paths.tmp + '/serve/'));
			/*
		.pipe($.inject(injectFiles, injectOptions))
		.pipe(wiredep(_.extend({}, conf.wiredep)))
		.pipe($.sourcemaps.init())
		.pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
		.pipe(browserSync.reload({stream: true}));
		*/
});
