var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var mkdirp = require('mkdirp');

module.exports = function (env) {
  var production = env !== 'development';
  gulp.task('stylus', function () {
    mkdirp('dist');
    var t = gulp.src('./lib/**/*.styl')
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(sourcemaps.write())
      .pipe(concat('dist.css'));

    if (production) t.pipe(minify());
    t.pipe(gulp.dest('./dist/'));
  });
};
