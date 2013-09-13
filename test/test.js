var app      = require('../nym')();
var log      = console.log;
var ecstatic = require('ecstatic')(__dirname);


var auth = function(req, res, next) {
  log('yaya auth', this.params);
  next()
}

var mw = [
  auth,
  function(req, res, next) {
    log('func 2')
    next()
  }
]

app.get('/api/:id', mw, function(req, res) {
  log('api get: ', this);
});

app.post('/api/:id', auth, function(req, res) {
  log('post', this.params)
  req.on('readable', function() {
    log('read', req.read());
  });
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
