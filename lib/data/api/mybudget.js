import debug from 'debug'
import MyBudget from '../models/mybudget'
import * as Category from './category'

const log = debug('presupuesto:data:api:mybudget')

/**
 * Main entry point for creating a MyBudget object to
 * save to mongo.
 */

export function create (data, cb) {
  log(`Creating new MyBudget: %j`, data)
  const myBudget = new MyBudget(data)
  myBudget.save((err, data) => {
    if (err) {
      return cb(err)
    }
    log(`MyBudget saved: %j`, data)
    cb(null, data)
  })
}
