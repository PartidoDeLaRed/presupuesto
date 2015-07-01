import gulp from 'gulp'
import config from '../lib/config'
import mongoose from 'mongoose'

// import fixtures and models
import categories from '../fixtures/categories'
import budgets from '../fixtures/budgets'
import Category from '../lib/data/models/category'
import Budget from '../lib/data/models/budget'


gulp.task('fixtures', () => {
  // Connect to the database
  mongoose.connect(config.dbURI);

  console.log('Creating fixtures in db: ', config.dbURI)

  Category.create(categories).then((savedCats) => {
    console.log('Saved %s categories to DB', savedCats.length)

    budgets.forEach((b) => {
      let cat = savedCats.find((c) => {return c.name == b.name})
      b.category = cat._id
    })

    Budget.create(budgets).then((savedBudgets) => {
      console.log('Saved %s budgets to DB', savedBudgets.length)
    }).then(() => {
    mongoose.disconnect()
    return console.log('Finished saving fixtures to DB')
  })
  })
})