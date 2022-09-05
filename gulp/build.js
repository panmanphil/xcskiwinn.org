var jshint = require('gulp-jshint');
var gulpSass = require('gulp-sass')
var sassSass = require('sass')
var path = require('path');
var conf = require('./conf');
var uglify = require('gulp-uglify');
var del = require('del');
var { inject } = require('./inject');

var sass = gulpSass(sassSass);

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

'use strict';
var gulp = require('gulp');
var { series } = require('gulp');
// Lint Task
function lint() {
	return gulp.src('js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
};


exports.clean = function clean(done) {
    del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
	done();
};


// Compile Our Sass
function sass() {
	return gulp.src('scss/*.scss')
			.pipe(sass().sync().on('error', sass.logError))
			.pipe(gulp.dest('css'));
};


function images() {
    var images = gulp.src(path.join(conf.paths.src, '/app/images/**'));
    return images.pipe(gulp.dest(path.join(conf.paths.tmp + '/serve/images')));
	
};

function html() {


	var htmlFilter = $.filter('**/*.html', {restore: true});
	var jsFilter = $.filter('**/*.js', {restore: true});
	var cssFilter = $.filter('**/*.css', {restore: true});

	return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
			.pipe($.useref())
			.pipe($.rev())

			.pipe(jsFilter)
			.pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
			.pipe(jsFilter.restore)
			.pipe(cssFilter)
			.pipe($.csso(true))
			.pipe(cssFilter.restore)
			.pipe(htmlFilter)
			.pipe($.minifyHtml({
				empty: true,
				spare: true,
				quotes: true,
				conditionals: true
			}))
			.pipe(htmlFilter.restore)
			.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
			.pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
};

exports.build = series(inject, html, images);
exports.default = series(inject, html, images);


