"use strict";

var _actionCreator = require("r2-js/libs/actionCreator");

var r2ActionCreator = _interopRequireWildcard(_actionCreator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var requestPosts = r2ActionCreator.requestPosts;
var receivePosts = r2ActionCreator.receivePosts;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(requestPosts, "requestPosts", "src/page/action.js");

  __REACT_HOT_LOADER__.register(receivePosts, "receivePosts", "src/page/action.js");
}();

;