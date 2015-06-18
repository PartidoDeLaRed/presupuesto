import express from 'express'
import budget from './budget'
import category from './category'

let routes = express()

routes.use('/budget', budget)
routes.use('/categories', category)

export default routes
