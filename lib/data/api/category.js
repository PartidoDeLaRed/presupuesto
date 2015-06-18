import debug from 'debug'
import Category from '../models/category'

let log = debug('presupuesto:data:api:category')

export function getAll (cb) {
  log('Querying all categories')
  Category
    .find()
    .exec(cb)
}
