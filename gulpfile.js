'use strict';
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	run = require('gulp-run'),
	fileSort = require('gulp-angular-filesort'),
	bowerFiles = require('main-bower-files'),
	uglify = require('gulp-uglifyjs'),
	concat = require('gulp-concat'),
	filter = require('gulp-filter');

	gulp.task('views',function(){
		return gulp.src('app/**/*.jade')
			.pipe(jade({prety:true}))
			.pipe(gulp.dest('./build'));
	});
	gulp.task('scripts',['vendor-js'],function(){
		return gulp.src(['app/**/*.js','!app/**/*_test.js'])
			.pipe(fileSort())
			.pipe(uglify('desk.min.js'))
			.pipe(gulp.dest('./build/scripts'));
	});
	gulp.task('vendor-js',function(){
		return gulp.src(bowerFiles())
			.pipe(filter(['**/*.js','!**/*min.js']))
			.pipe(uglify())
			.pipe(concat('vendors.min.js'))
			.pipe(gulp.dest('./build/scripts'));
	});

	gulp.task('build-linux',['scripts','views'],function(){
		gulp.src('app/package.json')
			.pipe(gulp.dest('./build'));
		return run('npm start').exec();
	})