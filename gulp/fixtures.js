import gulp from 'gulp'
import util from 'gulp-util'
import config from '../lib/config'
import mongoose from 'mongoose'

// import fixtures and models
import categories from '../fixtures/categories'
import budgets from '../fixtures/budgets'
import Category from '../lib/data/models/category'
import Budget from '../lib/data/models/budget'

gulp.task('fixtures', done => {
  // Connect to the database
  mongoose.connect(config.dbURI);
  util.log('Creating fixtures in DB:', util.colors.magenta(config.dbURI))

  Category.create(categories)
  .then(savedCats => {
    util.log('Saved %s categories to DB', util.colors.green(savedCats.length))

    budgets.forEach((b) => {
      const cat = savedCats.find(c => c.name == b.name)
      b.category = cat._id
    })

    Budget.create(budgets)
    .then(savedBudgets => util.log('Saved %s budgets to DB', util.colors.green(savedBudgets.length)))
    .then(() => mongoose.disconnect())
    .then(() => done())
  })
})
