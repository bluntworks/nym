var app      = require('../nym')();
var log      = console.log;
var ecstatic = require('ecstatic')(__dirname);

app.get('/api/:id', function(req, res) {
  log('api get: ', this.params);
});

app.get('/api/:id', function(req, res) {
  log(req.headers);
});

var http = require('http');

var srv  = http.createServer(function(req, res) {
  var ctx = app.test(req.method.toLowerCase(), req.url);
  if(ctx && ctx.fn) {
    ctx.fn.call(ctx, req, res);
  } else {
    ecstatic(req, res);
  }
});

srv.listen(8000);

log('listen on 8000');
