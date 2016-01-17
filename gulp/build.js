var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var path = require('path');
var conf = require('./conf');
var uglify = require('gulp-uglify');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

'use strict';

var gulp = require('gulp');
// Lint Task
gulp.task('lint', function() {
	return gulp.src('js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});


gulp.task('clean', function (done) {
    $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});


// Compile Our Sass
gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('css'));
});

gulp.task('partials', function () {
	return gulp.src([
				path.join(conf.paths.src, '/app/**/*.html'),
				path.join(conf.paths.tmp, '/serve/app/**/*.html')
			])
			.pipe($.minifyHtml({
				empty: true,
				spare: true,
				quotes: true
			}))

			.pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});
gulp.task('images', function () {
    var images = gulp.src(path.join(conf.paths.src, '/app/images/**'));
    images.pipe(gulp.dest(path.join(conf.paths.tmp + '/serve/images')));

});

gulp.task('html', ['inject', 'partials'], function () {
	var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
	var partialsInjectOptions = {
		starttag: '<!-- inject:partials -->',
		ignorePath: path.join(conf.paths.tmp, '/partials'),
		addRootSlash: false
	};

	var htmlFilter = $.filter('*.html');
	var jsFilter = $.filter('**/*.js');
	var cssFilter = $.filter('**/*.css');
	var assets;

	return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
			.pipe($.inject(partialsInjectFile, partialsInjectOptions))
			.pipe(assets = $.useref.assets())
			.pipe($.rev())

			.pipe(jsFilter)
			.pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
			.pipe(jsFilter.restore())
			.pipe(cssFilter)
			.pipe($.csso(true))
			.pipe(cssFilter.restore())
			.pipe(htmlFilter)
			.pipe($.minifyHtml({
				empty: true,
				spare: true,
				quotes: true,
				conditionals: true
			}))
			.pipe(htmlFilter.restore())
			.pipe(gulp.dest(path.join(conf.paths.dist, '/')))
			.pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
});

gulp.task('build', ['html', 'sass', 'scripts', 'images']);

