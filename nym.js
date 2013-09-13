var log    = require('bitlog')
var p2r    = require('./lib/path2regx');
var match  = require('./lib/match');
var each   = function(list, fn) { Array.prototype.forEach.call(list, fn); }
var filter = function(list, fn) { return Array.prototype.filter.call(list, fn); }
var stak   = require('blunt-stack')
var _slice = Array.prototype.slice

var Roostr = function(verbs) {
  if(!(this instanceof Roostr)) return new Roostr(verbs);
  this.verbs = verbs || ['get', 'post', 'put', 'del'];
  this.restify();
  this.routes = [];
}

var R = Roostr.prototype;

R.restify = function() {
  var self = this;
  each(this.verbs, function(verb) {
    R[verb] = function() {
      var args = _slice.call(arguments, 0)
      var path = args.shift()
      var keys = [];

      if(args.length === 2 && Array.isArray(args[0])) {
        var mw = args.shift()
        args = mw.concat(args)
      }

      self.routes.push({
          verb: verb
        , regexp: p2r.call(self, path, keys, false, false)
        , path: path
        , fn: stak.compose.apply(null, args)
        , keys: keys
      });
    };
  });
}

R.test = function(verb, path) {
  var ctx = false;
  each(filter(this.routes, function(it) { return it.verb === verb; })
  , function(r) {
      var params = {}
      var res =  match.call(r, path, params);
      if(res) {
        ctx = r;
        ctx.params = params;
      }
  });
  return ctx;
}

R.route = function(req, res) {
  var ctx = this.test(req.method.toLowerCase(), req.url);
  if(ctx) {
    ctx.fn.call(ctx, req, res);
    return ctx;
  } else return false;
}

module.exports = function() {
  return Roostr();
}
