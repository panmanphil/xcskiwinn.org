'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var util = require('util');


function browserSyncInit(baseDir, browser) {
	browser = browser === undefined ? 'default' : browser;

	var routes = null;
	if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
		routes = {
			'/bower_components': 'bower_components'
		};
	}

	var server = {
		baseDir: baseDir,
		routes: routes
	};

	browserSync.instance = browserSync.init({
		startPath: '/',
		server: server,
		browser: browser
	});
}

exports.serve = function serve() {
	browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
};

exports.serveDist = function( serveDist) {
	browserSyncInit(conf.paths.dist);
};
