var gulp = require('gulp');
var fs = require('fs');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function(opts) {
  opts = opts || {};
  opts.env = opts.env || 'development';
  opts.es6 = opts.es6 === 'undefined' ? false : opts.es6;

  var production = opts.env !== 'development';

  gulp.task('javascript', function () {
    mkdirp('public');

    var b = browserify({ debug: !production });
    if (opts.es6) b.transform(babelify);

    b.require('./lib/boot/boot.js', { entry: true })
      .bundle()
      .on('error', console.log)
      .pipe(fs.createWriteStream('./public/app.js'));
  });
};