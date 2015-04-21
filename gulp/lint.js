var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', ['javascript'], function () {
  gulp.src('./lib/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
