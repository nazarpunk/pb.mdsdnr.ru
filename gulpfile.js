'use strict';

const {watch, task, src, dest} = require('gulp'),
      {yellow, gray}           = require(`colors/safe`),
      sourcemaps               = require(`gulp-sourcemaps`),
      ts                       = require(`gulp-typescript`),
      sass                     = require(`gulp-sass`),
      error                    = error => {console.log(yellow(error.toString()))},
      scss_glob                = [`**/*.scss`, `!**/_*.scss`, `!node_modules/**/*`],
      scss_task                = src => src.pipe(sourcemaps.init())
                                           .pipe(sass().on('error', sass.logError))
                                           .pipe(sourcemaps.write())
                                           .pipe(dest('.')),
      ts_glob                  = [`**/*.ts`, `!**/*.d.ts`, `!node_modules/**/*`],
      ts_task                  = src => src.pipe(sourcemaps.init())
                                           .pipe(ts.createProject('tsconfig.json')()).on(`error`, error)
                                           .pipe(sourcemaps.write())
                                           .pipe(dest(`.`));

task(`watch`, cb => {
	cb();

	watch(scss_glob).on(`change`, path => {
		console.log(gray(path));
		scss_task(src(path));
	});
	watch(ts_glob).on(`change`, path => {
		console.log(gray(path));
		ts_task(src(path));
	});
});

task(`scss`, cb => {
	cb();
	scss_task(src(scss_glob));
});
task(`ts`, cb => {
	cb();
	ts_task(src(ts_glob));
});