import debug from 'debug'
import express from 'express'
import * as MyBudget from '../data/api/mybudget'
import {handleError} from './util'

let log = debug('presupuesto:api:mybudget')
let routes = express()

routes.get('/average', (req, res, next) => {
  log(`Requested average MyBudgets`)
  MyBudget.getAverage((err, data) => {
    if (err) {
      log(`Error in /average: ${err.toString()}`)
      return handleError(err, res)
    }
    log(`Delivering data: %j`, data)
    return res.json(data)
  })
})

routes.post('/', (req, res, next) => {
  log(`Posted My Budget: %j`, req.body)

  MyBudget.create(req.body, (err, data) => {
    if (err) {
      log(`Error creating MyBudget: ${err.toString()}`)
      return handleError(err, res)
    }

    return res.json({ id: data._id.toString() })
  })
})

export default routes
