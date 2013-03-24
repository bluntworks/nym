var log = function() { window && console.log.call(console, arguments); }

var Req = function(base) {
  if(!(this instanceof Req)) return new Req(base);
  this.base = base || null;
  this.verbs = {
      'get': 'GET'
    , 'post': 'POST'
    , 'put': 'PUT'
    , 'del': 'DELETE'
  }
  this.methods();
}

Req.prototype.methods = function() {
  var self  = this;
  var verbs = Object.keys(this.verbs);
  verbs.forEach(function(verb) {
    Req.prototype[verb] = function(url, data, fn) {
      var o     = { url: (self.base) ? self.base + url : url }
      var cb    = ('function' == typeof data) ? data : fn;

      if(fn) o.data = data;
      log(url);
      o.type    = self.verbs[verb];
      o.success = function(res) { cb(null, res); };
      o.error   = function(err) { cb(err); };

      log(verb, o.data);
      self.ajax(o);
    };
  });
}

Req.prototype.ajax = $.ajax;

$(function() {
  log('p o o h ');

  var req = Req();

  req.get('/api/01', function(err, res) {
    if(err) return log('Err: ', err);
    log(res);
  });

  req.post('/api/001', {
        name: 'Bob'
      , pass: '1234'
    }, function(err, res) {
        log('post', err, res);
  });

  req.post('http://192.168.1.178:7000', {
      name: 'parsley manor'
    , coop: 'booyyaaa'
  }, function(err, res) {
      log(err, res);
  });
});
