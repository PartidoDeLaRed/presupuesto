import debug from 'debug'
import Category from '../models/category'

let log = debug('presupuesto:data:api:category')

export function getAll (cb) {
  log('Querying all categories')
  Category
    .find()
    .exec(cb)
}

export function getCategoryByName (categoryName, cb) {
  log(`Querying category %j`, categoryName)

  Category.findOne({ name: categoryName }, (err, category) => {
    if (err) {
      log(`Error retrieving category by name '${categoryName}': ${err.toString()}`)
      return cb(err)
    }
    if (!category) {
      return cb(new Error(`Category not found: ${categoryName}`))
    }
    cb(null, category)
  })
}

export function getCategoryById (id, cb) {
  log(`Querying category %j`, id)

  Category.findOne({ _id: id }, (err, category) => {
    if (err) {
      log(`Error retrieving category by with id ${id}: ${err.toString()}`)
      return cb(err)
    }
    if (!category) {
      return cb(new Error(`Category not found with ID ${id}`))
    }
    cb(null, category)
  })
}
