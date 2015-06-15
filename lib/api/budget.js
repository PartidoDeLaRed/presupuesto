import debug from 'debug'
import express from 'express'
import * as Budget from '../data/api/budget'

let log = debug('presupuesto:api:budget')
let routes = express()

routes.get('/:year', (req, res, next) => {
  log(`Requested budget with params: %j`, req.params)
  let year = req.params.year
  Budget.getByYear(year, (err, data) => {
    if (err) {
      log(`Error getting budget by year ${year}: ${err.toString()}`)
      res.send(500).json(err)
    }

    log(`Delivering ${year} budget: %j`, data)
    res.json(data)
  })
})

export default routes
