import gulp from 'gulp'
import config from '../lib/config'
import mongoose from 'mongoose'

import debug from 'debug'
let log = debug('presupuesto:fixtures')

// import fixtures
import categories from '../fixtures/categories'
let Category = require('../lib/data/models/category')


gulp.task('fixtures', () => {
  // Connect to the database
  mongoose.connect(config.dbURI);

  console.log('Creating fixtures in db: ', config.dbURI)

  Category.create(categories).then( (saved) => {
     return console.log('Saved %s categories to DB', saved.length)
   })
})