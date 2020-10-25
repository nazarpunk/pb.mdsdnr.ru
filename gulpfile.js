'use strict';

const {watch, task, src, dest} = require('gulp'),
      {yellow, gray}           = require(`colors/safe`),
      {log}                    = require(`gulp-util`),
      sourcemaps               = require(`gulp-sourcemaps`),
      ts                       = require(`gulp-typescript`),
      error                    = error => {log(yellow(error.toString()))},
      watchOpts                = {queue: false},
      tsproject                = ts.createProject('tsconfig.json'),
      fs                       = require(`fs`),
      tsconfig                 = JSON.parse(fs.readFileSync(`tsconfig.json`).toString());

task('ts', () => tsproject.src().pipe(tsproject()).js.pipe(dest(file => file.base)));

task(`watch`, cb => {
	cb();

	const sass = require(`gulp-sass`);
	watch([`**/*.scss`, `!**/_*.scss`, `!node_modules/**/*`], watchOpts).on(`change`, path => {
		log(gray(path));
		src(path)
			.pipe(sourcemaps.init())
			.pipe(sass()).on(`error`, error)
			.pipe(sourcemaps.write())
			.pipe(dest('.'));
	});

	watch([`**/*.ts`, `!**/*.d.ts`, `!node_modules/**/*`], watchOpts).on(`change`, path => {
		log(gray(path));
		src(path)
			.pipe(sourcemaps.init())
			.pipe(ts(tsconfig.compilerOptions)).on(`error`, error)
			.pipe(sourcemaps.write())
			.pipe(dest(`.`));
	});
});