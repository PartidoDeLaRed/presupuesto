var express = require('express');
var app = express();
var path = require('path');
var resolve = path.resolve;

app.use(express.static(resolve('dist/client')));

app.get('/', require('../layout/index.js'));

var server = app.listen(8000, function () {
  console.log('App started, listening at http://%s:%s', server.address().address, server.address().port);
});
