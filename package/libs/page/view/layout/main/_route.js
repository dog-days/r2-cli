'use strict';

var view = function view() {
  //这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过r2Common未定义异常
  var re;
  try {
    re = '' + r2Common.prefixUrl;
  } catch (e) {}
  return re;
};
var childRoutes = function childRoutes() {
  //这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过require文件不存在异常
  var re;
  try {
    re = require('./.child_routes.js');
  } catch (e) {}
  return re;
};
var indexRoute = function indexRoute() {
  var re;
  try {
    re = require("src/page/view/index/_route.js");
  } catch (e) {}
  return re;
};
var component = function component() {
  var re;
  try {
    re = require("./index");
  } catch (e) {}
  return re;
};
module.exports = {
  path: view(),
  component: component(),
  getComponent: function getComponent(location, cb) {
    require.ensure([], function (require) {
      cb(null, require("./index"));
    }, "main");
  },

  indexRoute: indexRoute(),
  childRoutes: childRoutes()
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(view, 'view', 'src/page/view/layout/main/_route.js');

  __REACT_HOT_LOADER__.register(childRoutes, 'childRoutes', 'src/page/view/layout/main/_route.js');

  __REACT_HOT_LOADER__.register(indexRoute, 'indexRoute', 'src/page/view/layout/main/_route.js');

  __REACT_HOT_LOADER__.register(component, 'component', 'src/page/view/layout/main/_route.js');
}();

;