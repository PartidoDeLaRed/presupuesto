var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith')
var mkdirp = require('mkdirp');

module.exports = function (env) {
  var production = env !== undefined && env !== 'development';

  gulp.task('sprite', function () {
    var spriteData = gulp.src('lib/**/*.png')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
      }));

    if (production) spriteData.css.pipe(minify());
    spriteData.pipe(gulp.dest('./public/'))
  });

  gulp.task('css', [ 'sprite' ], function () {
    mkdirp('public');

    var t = gulp.src('./lib/**/*.styl')
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(sourcemaps.write())
      .pipe(concat('app.css'));

    if (production) t.pipe(minify());
    t.pipe(gulp.dest('./public/'));
  });
};
