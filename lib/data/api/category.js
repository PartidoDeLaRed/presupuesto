import debug from 'debug'
import Category from '../models/category'

let log = debug('presupuesto:data:api:category')

export function getAll (cb) {
  log('Querying all categories')
  Category
    .find()
    .exec(cb)
}

export function getCategoryByName (categoryName, err, success) {
  //console.log('Querying category: ', categoryName)
  log(`Querying category %j`, categoryName)
  
  Category.findOne({ name: categoryName }, function (err, category) {
			if (err) {
				console.log('Error retrieving category by name: ', categoryName, err);
			}else {
				success(category)
			}
		})
    //.exec(cb)
}

export function getCategoryById (id, err, success) {
  //console.log('Querying category: ', id)
  log(`Querying category %j`, id)
  
  Category.findOne({ _id: id }, function (err, category) {
			if (err) {
				console.log('Error retrieving category by id: ', id, err);
			}else {
				success(category)
			}
		})
    //.exec(cb)
}