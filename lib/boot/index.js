import express from 'express';
import path from 'path';
import layout from '../layout'
import debug from 'debug'

let log = debug('presupuesto:boot')
let app = express();

/*
 * Static assets
 */

let assets = path.resolve('public');
app.use(express.static(assets));

/*
 * Routes
 */

app.get('/', layout);

/*
 * Launch server
 */

var server = app.listen(process.env.PORT || 8000, () => log('App started, listening at http://%s:%s', server.address().address, server.address().port));
