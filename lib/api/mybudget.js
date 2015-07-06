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

routes.get('/:id', (req, res, next) => {
  log(`Requested MyBudget with ID ${req.params.id}`)

  MyBudget.findById(req.params.id, (err, myBudget) => {
    if (err) {
      log(`Error getting MyBudget with ID ${req.params.id}: ${err.toString()}`)
      return handleError(err, res)
    } else if (!myBudget) {
      const message = `MyBudget with ID ${req.params.id} not found`
      log(message)
      return handleError(new Error(message), res)
    }

    return res.json(myBudget)
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
