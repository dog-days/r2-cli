'use strict';

var view = function view() {
  //这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过异常
  var re;
  try {
    re = r2Common.prefixUrl + "/about";
  } catch (e) {}
  return re;
};
module.exports = {
  layout: "main",
  path: view(),
  getComponent: function getComponent(location, cb) {
    require.ensure([], function (require) {
      cb(null, require("./index"));
    }, "about");
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(view, "view", "src/page/view/about/_route.js");
}();

;