'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchGetData = fetchGetData;
var requestPosts = r2ActionCreator.requestPosts;
var receivePosts = r2ActionCreator.receivePosts;
//常量
var REQUEST = exports.REQUEST = 'REQUESTABOUT';
var RECIEVE = exports.RECIEVE = 'RECIEVEAABOUT';
//actionCreators

function fetchGetData() {
  var _params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var success = arguments[1];

  var url = '' + r2Common.REQUESTURL;
  //url参数拼接
  url = r2fn.params(url, _params);
  return r2fetch({
    method: 'GET',
    successMessage: false
  }).dispatchFetchOne(url, requestPosts(REQUEST, 'main'), receivePosts(RECIEVE, 'main'), success);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(requestPosts, 'requestPosts', 'src/page/view/about/action.js');

  __REACT_HOT_LOADER__.register(receivePosts, 'receivePosts', 'src/page/view/about/action.js');

  __REACT_HOT_LOADER__.register(REQUEST, 'REQUEST', 'src/page/view/about/action.js');

  __REACT_HOT_LOADER__.register(RECIEVE, 'RECIEVE', 'src/page/view/about/action.js');

  __REACT_HOT_LOADER__.register(fetchGetData, 'fetchGetData', 'src/page/view/about/action.js');
}();

;