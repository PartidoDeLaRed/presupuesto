var gulp = require('gulp')
var spawn = require('child_process').spawn

// Clone the process.env object and extend it
var env = Object.create(process.env)

var debug = 'presupuesto*'
// if (undefined !== env.DEBUG) {
//   debug = env.DEBUG
// } else if (settings.verbose) {
//   debug = '*'
// }

env.NODE_PATH = '.'
env.DEBUG = debug

gulp.task('serve', function (cb) {
  return spawn('./node_modules/.bin/babel-node', ['lib/boot/index.js'], { stdio: [0, 1, 2], env: env })
})
