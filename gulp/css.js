var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith')

module.exports = function (env) {
  var production = env !== undefined && env !== 'development';

  gulp.task('sprite', ['public'], function () {
    var spriteData = gulp.src('lib/**/*.png')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
      }));

    if (production) {
      console.log('Minifying spritesheets for production...')
      spriteData.css.pipe(minify());
    }

    spriteData.pipe(gulp.dest('./public/'))
  });

  gulp.task('css', [ 'sprite' ], function () {
    var t = gulp.src('./lib/**/*.styl')
    if (!production) t = t.pipe(sourcemaps.init());
    t = t.pipe(stylus())
    if (!production) t = t.pipe(sourcemaps.write());
    t = t.pipe(concat('app.css'));

    if (production) t = t.pipe(minify());
    t.pipe(gulp.dest('./public/'));
  });
};
