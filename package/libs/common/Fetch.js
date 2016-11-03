'use strict';

var _css = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _desc, _value, _class;

var _override = require('core-decorators/lib/override');

var _override2 = _interopRequireDefault(_override);

var _deprecate = require('core-decorators/lib/deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouterRedux = require('react-router-redux');

var _BasicFetch2 = require('r2-js/libs/fetch/BasicFetch');

var _BasicFetch3 = _interopRequireDefault(_BasicFetch2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * 针对当前项目fetch封装 
 */
var Fetch = (_class = function (_BasicFetch) {
  _inherits(Fetch, _BasicFetch);

  function Fetch() {
    _classCallCheck(this, Fetch);

    return _possibleConstructorReturn(this, (Fetch.__proto__ || Object.getPrototypeOf(Fetch)).apply(this, arguments));
  }

  _createClass(Fetch, [{
    key: 'dispatchFetchOne',
    value: function dispatchFetchOne(url, request, receive, successCallback200, callbackOtherStatus, errorCallback) {
      var _this2 = this;

      var msg = {};
      if (!successCallback200) {
        successCallback200 = function successCallback200(json, dispatch) {
          if (_this2.option.successMessage) {
            msg = {
              title: '提示',
              content: json.message
            };
            _message2.default.success(json.message);
            //Antd.Modal.success(msg);
          }
        };
      }
      var callbackOtherStatusNot401 = function callbackOtherStatusNot401(json, dispatch) {
        msg = {
          title: '提示',
          content: json.message
        };
        if (json.status == 401) {
          //Antd.Modal.info(msg);
          _message2.default.warn(json.message);
          setTimeout(function () {
            dispatch((0, _reactRouterRedux.push)(r2Common.prefixUrl + '/login'));
          }, 1000);
        } else {
          if (!callbackOtherStatus) {
            _message2.default.error(json.message);
            //alert(0)
          } else {
            callbackOtherStatus(json, dispatch);
          }
        }
      };
      if (!errorCallback) {
        errorCallback = function errorCallback(e) {
          msg = {
            title: '提示',
            content: "请求出错或网络连接有问题或发生未知错误！请重新尝试，或联系管理人员！"
          };
          _message2.default.error(msg.content);
          //Antd.Modal.error(msg);
        };
      }
      return _get(Fetch.prototype.__proto__ || Object.getPrototypeOf(Fetch.prototype), 'dispatchFetchOne', this).call(this, url, request, receive, successCallback200, callbackOtherStatusNot401, errorCallback);
    }
  }, {
    key: 'dispatchFetchMore',
    value: function dispatchFetchMore(urls, request, receive, successCallback200, callbackOtherStatus, errorCallback) {
      var msg = {};
      if (!successCallback200) {
        successCallback200 = function successCallback200(jsonArray, dispatch) {};
      }
      if (!callbackOtherStatus) {
        callbackOtherStatus = function callbackOtherStatus(jsonArray, dispatch) {
          var i = 0;
          var j = 0;
          jsonArray.forEach(function (v, k) {
            if (v.status == 401) {
              if (i == 0) {
                setTimeout(function () {
                  dispatch((0, _reactRouterRedux.push)('/login'));
                }, 1000);
              }
              i++;
            } else {
              if (j == 0) {
                msg = {
                  title: '提示',
                  content: "请求出错！"
                };
                //Antd.Modal.error(msg);
                _message2.default.error(jsonArray[j].message);
              }
              j++;
            }
          });
        };
      }
      if (!errorCallback) {
        errorCallback = function errorCallback(e) {
          msg = {
            title: '提示',
            content: "发生未知错误！"
          };
          //Antd.Modal.error(msg);  
          _message2.default.error(msg.content);
        };
      }
      return _get(Fetch.prototype.__proto__ || Object.getPrototypeOf(Fetch.prototype), 'dispatchFetchMore', this).call(this, urls, request, receive, successCallback200, callbackOtherStatus, errorCallback);
    }
  }]);

  return Fetch;
}(_BasicFetch3.default), (_applyDecoratedDescriptor(_class.prototype, 'dispatchFetchOne', [_override2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'dispatchFetchOne'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dispatchFetchMore', [_override2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'dispatchFetchMore'), _class.prototype)), _class);


module.exports = Fetch;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Fetch, 'Fetch', 'src/common/Fetch.js');
}();

;