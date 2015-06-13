import express from 'express'
import budget from './budget'

let routes = express()

routes.use('/budget', budget)

export default routes
