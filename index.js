var browserify = require('browserify');
var http = require('http');

var server = http.createServer(function (req, res) {
  if (req.url === '/dist/dist.js') {
    res.setHeader('content-type', 'application/javascript');
    var b = browserify(__dirname + '/lib/main.js').bundle();
    b.on('error', console.error);
    b.pipe(res);
  }
});

server.listen(8000);