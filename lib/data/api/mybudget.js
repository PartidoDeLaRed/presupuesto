import debug from 'debug'
import MyBudget from '../models/mybudget'

let log = debug('presupuesto:data:api:mybudget')

export function create (data, cb) {
  log(`Creating new MyBudget: %j`, data)
  // return MyBudget
  //   .find({ year: year })
  //   .populate('category')
  //   .exec(cb)
  cb(null, {})
}
