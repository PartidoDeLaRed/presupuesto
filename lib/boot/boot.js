import page from 'page'
import debug from 'debug'
import config from '../config/config'

if (config.clientDebug) {
  debug.enable(config.clientDebug)
}

import '../header/header.js'
import '../footer/footer.js'
import '../tasks/tasks.js'
import '../test/test.js'
import '../first/first.js'

/*
 * Initialize `page`
 */

page()
