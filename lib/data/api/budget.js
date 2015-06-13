import debug from 'debug'
import Budget from '../models/budget'

let log = debug('presupuesto:data:api:budget')

export function getByYear (year, cb) {
  log(`Getting budget of year ${year}`)
  return Budget.find({ year: year }, cb)
}
