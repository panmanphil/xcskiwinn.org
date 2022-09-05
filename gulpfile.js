/**
	*  Welcome to your gulpfile!
	*  The gulp tasks are splitted in several files in the gulp directory
	*  because putting all here was really too long
	*/

/* jshint node:true */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var { build, clean } = require('./gulp/build');
var { styles } = require('./gulp/styles');
var { scripts } = require('./gulp/scripts');
var { inject } = require('./gulp/inject');
var { serve, serveDist } = require('./gulp/server');
var { deployDist } = require('./gulp/deploy');


/**
	*  Default task clean temporaries directories and launch the
	*  main optimization build task
	*/
exports.serve = serve;
exports.serveDist = serveDist;
exports.default = gulp.series(clean, styles, scripts, inject, build, deployDist);

