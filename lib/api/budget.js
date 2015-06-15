import debug from 'debug'
import express from 'express'
import * as Budget from '../data/api/budget'
import {handleError} from './util'

let log = debug('presupuesto:api:budget')
let routes = express()

routes.get('/:year', (req, res, next) => {
  log(`Requested budget with params: %j`, req.params)
  let year = req.params.year
  Budget.getByYear(year, (err, data) => {
    if (err) {
      log(`Error getting ${year} budget: ${err.toString()}`)
      return handleError(res)
    }

    if (!data.length) {
      let message = `No data for year ${year}`
      log(message)
      return handleError(message, res)
    }

    log(`Delivering ${year} budget: %j`, data)
    return res.json(data)
  })
})

export default routes
