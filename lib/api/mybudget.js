import debug from 'debug'
import express from 'express'
import * as MyBudget from '../data/api/mybudget'
import {handleError} from './util'

let log = debug('presupuesto:api:mybudget')
let routes = express()

routes.post('/', (req, res, next) => {
  log(`Posted My Budget: %j`, req.body)
  MyBudget.create(req.body, (err, data) => {
    if (err) {
      log(`Error creating MyBudget: ${err.toString()}`)
      return handleError(res)
    }

    return res.sendStatus(200)
  })
})

export default routes
