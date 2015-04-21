var gulp = require('gulp');
var fs = require('fs');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function(env) {
  var production = env !== 'development';
  return gulp.task('javascript', function () {
    mkdirp('dist');
    var b = browserify({
      debug: !production
    })
    .transform(babelify)
    .require('./lib/main.js', { entry: true })
    .bundle()
    .on('error', function (err) { console.log(err.message); })
    .pipe(fs.createWriteStream('./dist/dist.js'));
  });
};