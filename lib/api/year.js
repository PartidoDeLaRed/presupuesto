import debug from 'debug'
import express from 'express'
import * as Budget from '../data/api/budget'
import {handleError} from './util'

let log = debug('presupuesto:api:year')
let routes = express()

routes.get('/', (req, res, next) => {
  log(`Requested all years`)
  Budget.getYears((err, data) => {
    if (err) {
      log(`Error getting all years: ${err.toString()}`)
      return handleError(res)
    }

    if (!data.length) {
      let message = `No data`
      log(message)
      return handleError(message, res)
    }

    log(`Delivering years: %j`, data)
    return res.json(data)
  })
})

export default routes
