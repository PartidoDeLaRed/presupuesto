var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var sourcemaps = require('gulp-sourcemaps')

module.exports = function (env) {
  env = env || 'development'
  var production = env !== 'development'

  gulp.task('javascript', ['public'], function () {
    var b = browserify({ entries: './lib/boot/boot.js', debug: !production })
    b = b
      .transform(babelify)
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())

    if (!production) b = b.pipe(sourcemaps.init({ loadMaps: true }))
    if (production) b = b.pipe(uglify())
    if (!production) b = b.pipe(sourcemaps.write('./'))

    return b.pipe(gulp.dest('./public/'))
  });
};
