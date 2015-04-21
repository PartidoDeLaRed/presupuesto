'use strict';

var env = process.env.NODE_ENV;

require('./gulp/javascript')(env);
require('./gulp/stylus')(env);
require('./gulp/watch');
require('./gulp/test');
require('./gulp/lint');
require('./gulp/clean');

require('gulp')
  .task('build', ['lint', 'javascript', 'stylus'])
  .task('dist', ['lint', 'test', 'build'])
  .task('serve', ['build', 'watch'])
  .task('default', ['build']);

/**
 * es6, source map, tests, server side code, watch, jslint, ci
 */
