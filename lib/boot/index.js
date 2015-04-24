import express from 'express';
import path from 'path';
import layout from '../layout/index.js'

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

var server = app.listen(8000, () => console.log('App started, listening at http://%s:%s', server.address().address, server.address().port));
