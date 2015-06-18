var gulp = require('gulp')
var spawn = require('child_process').spawn

// Clone the process.env object and extend it
var env = Object.create(process.env)

env.NODE_PATH = '.'
env.DEBUG = 'presupuesto*'

gulp.task('serve', function (cb) {
  var task = {}
  if ('win32' === process.platform) {
    task.node = 'node_modules\\.bin\\babel-node'
    task.main = 'lib\\boot\\index.js'
  } else {
    task.node = './node_modules/.bin/babel-node'
    task.main = 'lib/boot/index.js'
  }

  return spawn(task.node, [task.main], { stdio: [0, 1, 2], env: env })
})
