var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src('./tests/index.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});
