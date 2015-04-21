var gulp = require('gulp');

gulp.task('watch', function () {
  gulp.watch('lib/**/*.js', ['javascript']);
  gulp.watch('lib/**/*.styl', ['stylus']);
});
