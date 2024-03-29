'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var conf = require('./conf');
var path = require('path');
var args = require('yargs').argv;

exports.deploy= function () {

	var destination = "xcskiwinn.org";


	var publisher = awspublish.create({

        region: 'us-west-2',
		params: {
			Bucket: destination
		}
	});

	return gulp.src(path.join(conf.paths.tmp, '/serve/**'))
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
};

exports.deployDist = function deployDist() {
	return gulp.src(path.join(conf.paths.tmp, '/serve/**'))
		.pipe(gulp.dest(conf.paths.dist));
}
