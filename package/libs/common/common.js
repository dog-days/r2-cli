"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//设置公共path
var prefixUrl = exports.prefixUrl = "";
//设置页签后缀标题
var suffixTitle = exports.suffixTitle = "-suffix title";
//国际化处理
//export const language = require("./locale/en_US") 
var REQUESTURL = exports.REQUESTURL = "";
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(prefixUrl, "prefixUrl", "src/common/common.js");

  __REACT_HOT_LOADER__.register(suffixTitle, "suffixTitle", "src/common/common.js");

  __REACT_HOT_LOADER__.register(REQUESTURL, "REQUESTURL", "src/common/common.js");
}();

;