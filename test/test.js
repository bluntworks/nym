var app = require('../nym')();
var log = console.log;

app.get('/php-api/sale/:sid/:bid', function(req, res) {
  log('log get sales');
});

app.post('/php-api/sale/:sid', function(req, res) {
  log('log get sales');
});

app.put('/php-api/sale/:sid', function(req, res) {
  log('log get sales');
});

app.del('/php-api/sale/:sid/:bid', function(req, res) {
  log('log get sales');
});

var ctx = app.test('get', '/php-api/sale/0000/9999');

log(ctx);
//console.log(app.routes);
