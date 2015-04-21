var gulp = require('gulp');
var fs = require('fs');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var babelify = require('babelify');
var babel = require('gulp-babel');

module.exports = function(opts) {
  opts = opts || {};
  opts.env = opts.env || 'development';
  opts.es6 = opts.es6 === 'undefined' ? false : opts.es6;

  var production = opts.env !== 'development';

  gulp.task('javascript', ['javascript:client', 'javascript:server']);

  gulp.task('javascript:server', function () {
    var t = gulp.src('./lib/boot/index.js');
    if (opts.es6) t.pipe(babel());
    t.pipe(gulp.dest('dist/server'));
  });

  gulp.task('javascript:client', function () {
    mkdirp('dist');
    mkdirp('dist/client');

    var b = browserify({ debug: !production });
    if (opts.es6) b.transform(babelify);

    b.require('./lib/main.js', { entry: true })
      .bundle()
      .on('error', console.log)
      .pipe(fs.createWriteStream('./dist/client/dist.js'));
  });
};