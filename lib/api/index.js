import express from 'express'
import budget from './budget'
import category from './category'
import year from './year'
import mybudget from './mybudget'

let routes = express()

routes.use('/budget', budget)
routes.use('/categories', category)
routes.use('/years', year)
routes.use('/mybudget', mybudget)

export default routes
