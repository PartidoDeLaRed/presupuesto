var gulp = require('gulp');
var rm = require('rimraf');

gulp.task('clean', function (cb) {
  rm('./public', function () {
    rm('./node_modules', cb);
  });
});
