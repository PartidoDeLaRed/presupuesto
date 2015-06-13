var gulp = require('gulp')
var spawn = require('child_process').spawn

// Clone the process.env object and extend it
var env = Object.create(process.env)

env.NODE_PATH = '.'
env.DEBUG = 'presupuesto*'

gulp.task('serve', function (cb) {
  return spawn('./node_modules/.bin/babel-node', ['lib/boot/index.js'], { stdio: [0, 1, 2], env: env })
})
