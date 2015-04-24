'use strict';

var env = process.env.NODE_ENV;

require('./gulp/javascript')({ env: env, es6: true });
require('./gulp/css')(env);
require('./gulp/watch');
require('./gulp/test');
require('./gulp/lint');
require('./gulp/clean');

require('gulp')
  .task('build', ['lint', 'javascript', 'css'])
  .task('dist', ['test', 'build'])
  .task('serve', ['build', 'watch'], function () {

  })
  .task('default', ['build']);
