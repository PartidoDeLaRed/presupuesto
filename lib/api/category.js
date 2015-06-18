import debug from 'debug'
import express from 'express'
import * as Category from '../data/api/category'
import {handleError} from './util'

let log = debug('presupuesto:api:category')
let routes = express()

routes.get('/', (req, res, next) => {
  log(`Requested all categories`)
  Category.getAll((err, data) => {
    if (err) {
      log(`Error getting categories: ${err.toString()}`)
      return handleError(res)
    }

    if (!data.length) {
      let message = `No categories found`
      log(message)
      return handleError(message, res)
    }

    log(`Delivering categories: %j`, data)
    return res.json(data)
  })
})

export default routes
