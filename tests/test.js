//require('babel-core/register');
//处理这警告Possible EventEmitter memory leak detected. 11 version listeners added. Use emitter.setMaxListeners() to increase limit 
require('events').EventEmitter.prototype._maxListeners = 0;

var initEmpty = require("./init.empty.test.js");
var initNotEmpty = require("./init.not.empty.test.js");
var reset = require("./reset.test.js");
var resetCannot = require("./reset.cannot.test.js");

initNotEmpty().then(function(){
  return reset();
}).then(function(){
  return initEmpty();
}).then(function(){
  return reset();
}).then(function(){
  return resetCannot();
});
