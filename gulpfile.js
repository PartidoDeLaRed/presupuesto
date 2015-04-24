'use strict';

var env = process.env.NODE_ENV;

require('./gulp/javascript')(env);
require('./gulp/css')(env);
require('./gulp/watch');
require('./gulp/test');
require('./gulp/lint');
require('./gulp/clean');
require('./gulp/public');

require('gulp')
  .task('build', ['lint', 'javascript', 'css'])
  .task('dist', ['test', 'build'])
  .task('default', ['build']);
