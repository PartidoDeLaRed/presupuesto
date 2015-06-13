import express from 'express'
import path from 'path'
import config from '../config'
import layout from '../layout'
import debug from 'debug'
import api from '../api'
import mongoose from 'mongoose'
import '../data/models'

let log = debug('presupuesto:boot')
let app = express()

/*
 * Connect to the database
 */

mongoose.connect(config.dbURI);

/*
 * Static assets
 */

let assets = path.resolve('public')
app.use(express.static(assets))

/*
 * Routes
 */

app.get('/', layout)
app.use('/api', api)

/*
 * Launch server
 */

var server = app.listen(process.env.PORT || 8000, () => log('App started, listening at http://%s:%s', server.address().address, server.address().port))
