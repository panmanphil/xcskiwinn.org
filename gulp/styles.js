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

exports.styles = function styles() {

	gulp.src([path.join(conf.paths.src, '/app/css/*.css')])
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/css')));

    var ignore = '!' +
        path.join(conf.paths.src, '/app/css/responsive*.css');
	var injectFiles = gulp.src([
		path.join(conf.paths.src, '/app/css/*.css'),
        ignore
    ], {read: false});
	var options = {
		transform: function (filepath, dest) {
			filepath = filepath.replace('' + conf.paths.src + '/app/', '');
			filepath = filepath.replace(/^\//, '');

			return '@import url("/' + filepath + '");';
		},
        starttag: '/*inject:css*/',
        endtag: '/*endinject*/'
	};


	var target = gulp.src([
		path.join(conf.paths.src, '/app/**/index.html')
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
};
