//项目common,不同项目会不同
window.r2Common = require('common/common');
//公共方法
window.r2fn = require('src/common/function').default;
//公共fetch
var Fetch = require('common/Fetch').default;
window.r2fetch = function(option){
  return new Fetch(option)
};

//公共Redux actionCreator
var r2CommonActionCreator = require("r2-js/libs/actionCreator")
window.r2ActionCreator = Object.assign({},r2CommonActionCreator,require('src/page/action'));
