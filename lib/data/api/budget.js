import debug from 'debug'
import Budget from '../models/budget'

let log = debug('presupuesto:data:api:budget')

export function getByYear (year, cb) {
  log(`Querying ${year} budget`)
  return Budget
    .find({ year: year })
    .populate('category')
    .exec(cb)
}
