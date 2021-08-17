'use strict';

const {watch, task, src, dest} = require('gulp');
const {yellow, gray} = require(`colors/safe`);
const sourcemaps = require(`gulp-sourcemaps`),
      ts         = require(`gulp-typescript`),
      sass       = require('gulp-sass')(require('sass')), // https://github.com/dlmanning/gulp-sass/wiki/Update-to-the-latest-Gulp-Sass
      error      = error => {console.log(yellow(error.toString()))},
      scss_glob  = [`**/*.scss`, `!**/_*.scss`, `!node_modules/**/*`],
      scss_task  = src => src.pipe(sourcemaps.init())
                             .pipe(sass().on('error', sass.logError))
                             .pipe(sourcemaps.write())
                             .pipe(dest(file => file.base)),
      ts_glob    = [`**/*.ts`, `!**/*.d.ts`, `!node_modules/**/*`],
      ts_task    = src => src.pipe(sourcemaps.init())
                             .pipe(ts.createProject('tsconfig.json')()).on(`error`, error)
                             .pipe(sourcemaps.write())
                             .pipe(dest(file => file.base));


task(`watch`, cb => {
	cb();
	watch(scss_glob).on(`change`, path => scss_task(src(path)).on(`end`, () => console.log(gray(path))));
	watch(ts_glob).on(`change`, path => ts_task(src(path)).on(`end`, () => console.log(gray(path))));
});

task(`scss`, cb => scss_task(src(scss_glob)).on(`end`, cb));
task(`ts`, cb => ts_task(src(ts_glob)).on(`end`, cb));