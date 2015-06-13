import debug from 'debug'
import fs from 'fs'
import mergeUtil from 'merge-util'
import environment from './env'

let log = debug('presupuesto:config')
let exists = fs.existsSync

function parse (envFile) {
  let file = `./config/${envFile}.json`;
  if (!exists(file)) {
    log('%s don\'t exists, ignoring', file)
    return {}
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function merge(obj1, obj2) {
  return mergeUtil(obj1, obj2, { inheritance: true })
}

let env = process.env.NODE_ENV || 'development'
let defaultsFile = parse('defaults')
let envFile = parse(env)

var config = merge(defaultsFile, merge(envFile, environment))
log('Using this configuration values: %o', config)

export default config
