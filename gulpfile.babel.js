'use strict';

var env = process.env.NODE_ENV

require('./gulp/javascript')(env)
require('./gulp/css')(env)
import './gulp/watch'
import './gulp/test'
import './gulp/lint'
import './gulp/clean'
import './gulp/public'
import './gulp/serve'

import gulp from 'gulp'

gulp
  .task('build', ['lint', 'javascript', 'css'])
  .task('dist', ['test', 'build'])
  .task('default', ['build'])
