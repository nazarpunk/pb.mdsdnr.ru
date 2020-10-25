'use strict';

const {watch, task, src, dest} = require('gulp'),
      {yellow, gray}           = require(`colors/safe`),
      {log}                    = require(`gulp-util`),
      sourcemaps               = require(`gulp-sourcemaps`),
      ts                       = require(`gulp-typescript`),
      sass                     = require(`gulp-sass`),
      error                    = error => {log(yellow(error.toString()))},
      watch_scss               = [`**/*.scss`, `!**/_*.scss`, `!node_modules/**/*`],
      task_scss                = src => src.pipe(sourcemaps.init())
                                           .pipe(sass()).on(`error`, error)
                                           .pipe(sourcemaps.write())
                                           .pipe(dest('.')),
      tsconfig                 = JSON.parse(require('fs').readFileSync(`tsconfig.json`).toString()),
      watch_ts                 = [`**/*.ts`, `!**/*.d.ts`, `!node_modules/**/*`],
      task_ts                  = src => src.pipe(sourcemaps.init())
                                           .pipe(ts(tsconfig.compilerOptions)).on(`error`, error)
                                           .pipe(sourcemaps.write())
                                           .pipe(dest(`.`));

task(`watch`, cb => {
	cb();

	watch(watch_scss).on(`change`, path => {
		log(gray(path));
		task_scss(src(path));
	});
	watch(watch_ts).on(`change`, path => {
		log(gray(path));
		task_ts(src(path));
	});
});

task(`scss`, cb => {
	cb();
	task_scss(src(watch_scss));
});
task(`ts`, cb => {
	cb();
	task_ts(src(watch_ts));
});