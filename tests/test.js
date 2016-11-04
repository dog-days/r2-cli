//require('babel-core/register');
//处理这警告Possible EventEmitter memory leak detected. 11 version listeners added. Use emitter.setMaxListeners() to increase limit 
require('events').EventEmitter.prototype._maxListeners = 0;

//空文件夹初始化
var initEmpty = require("./init.empty.test.js");
//非空文件夹初始化
var initNotEmpty = require("./init.not.empty.test.js");
//不带-m命令参数智能创建路由和reducer
var ac = require("./ac.test.js");
//有.r2rc文件的重置
var reset = require("./reset.test.js");
//无.r2rc文件的重置
var resetCannot = require("./reset.cannot.test.js");

initNotEmpty().then(function(){
  return reset();
}).then(function(){
  return initEmpty();
}).then(function(){
  return ac();
}).then(function(){
  return reset();
}).then(function(){
  return resetCannot();
});
