var gulp = require('gulp');

gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js', 'lib/**/*.jade'], ['javascript']);
  gulp.watch('lib/**/*.styl', ['stylus']);
});
