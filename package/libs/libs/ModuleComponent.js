'use strict';

var _css = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css2 = require('antd/lib/breadcrumb/style/css');

var _breadcrumb = require('antd/lib/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicComponent2 = require('r2-js/libs/module/BasicComponent');

var _BasicComponent3 = _interopRequireDefault(_BasicComponent2);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Breadcrumb = _breadcrumb2.default;
var commonAction = r2ActionCreator;
/**
 *  页面模块都应该继承这个类，该类继承越本框架最基层的BasicComponent。该封装了框架模块常用方法，路由参数（有改动），设置表单值
 * @prop {String} layout 默认为`page/layout`
 * @prop {String} titleSffix 默认需要配置
 * @prop {String} homLink 面包屑之主页设置 
 */

var ModuleComponent = function (_BasicComponent) {
  _inherits(ModuleComponent, _BasicComponent);

  function ModuleComponent(props) {
    _classCallCheck(this, ModuleComponent);

    return _possibleConstructorReturn(this, (ModuleComponent.__proto__ || Object.getPrototypeOf(ModuleComponent)).call(this, props));
  }

  _createClass(ModuleComponent, [{
    key: 'createBreadcrumb',
    value: function createBreadcrumb() {
      if (this.props && this.props.children) {
        var breadcrumb = this.props.children.props.breadcrumb;
        if (breadcrumb) {
          var c_props = this.props.children.props;
          this.breadcrumb = _react2.default.createElement(
            Breadcrumb,
            { className: 'breadcrumb' },
            _react2.default.createElement(
              Breadcrumb.Item,
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: this.props.homeLink.link },
                this.props.homeLink.label
              )
            ),
            breadcrumb.map(function (v, k) {
              if (v.link) {
                var link, label;
                if (Object.prototype.toString.apply(v.link) == "[object Function]") {
                  link = v.link(c_props);
                } else {
                  link = v.link;
                }
                if (Object.prototype.toString.apply(v.label) == "[object Function]") {
                  label = v.label(c_props);
                } else {
                  label = v.label;
                }
                return _react2.default.createElement(
                  Breadcrumb.Item,
                  { key: k },
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: link },
                    label
                  )
                );
              } else {
                return _react2.default.createElement(
                  Breadcrumb.Item,
                  { key: k },
                  v.label
                );
              }
            })
          );
        } else {
          this.breadcrumb = '';
        }
      }
    }

    /**
     * state方式设置表单值 
     * @param { String } inputid 自定义 
     */

  }, {
    key: 'handleInputState',
    value: function handleInputState(inputid) {
      var _this3 = this;

      return {
        onChange: function onChange(e) {
          var state = {};
          if (!e.target) {
            state[inputid] = e;
            _this3.setState(state);
          } else if (e.target.type == "checkbox") {
            if (e.target.checked) {
              state[inputid] = e.target.value;
              _this3.setState(state);
            } else {
              state[inputid] = null;
              _this3.setState(state);
            }
          } else {
            state[inputid] = e.target.value;
            _this3.setState(state);
          }
        },
        value: this.state[inputid]
      };
    }
    /**
     * Redex方式设置表单值
     * @param { String } inputid 自定义 
     */

  }, {
    key: 'handleInputProps',
    value: function handleInputProps(inputid) {
      var _this = this;
      return {
        onChange: function onChange(e) {
          //console.debug(e.target.type)
          if (!e.target) {
            _this.props.dispatch(commonAction.inputAction(inputid, e));
          } else if (e.target.type == "checkbox") {
            if (e.target.checked) {
              _this.props.dispatch(commonAction.inputAction(inputid, e.target.value));
            } else {
              _this.props.dispatch(commonAction.inputAction(inputid, null));
            }
          } else {
            _this.props.dispatch(commonAction.inputAction(inputid, e.target.value));
          }
        },
        value: _this.props.formInput[inputid]
      };
    }
  }, {
    key: 'render',
    value: function render() {
      _get(ModuleComponent.prototype.__proto__ || Object.getPrototypeOf(ModuleComponent.prototype), 'render', this).call(this);
      this.createBreadcrumb();
    }
  }]);

  return ModuleComponent;
}(_BasicComponent3.default);

ModuleComponent.defaultProps = {
  layout: "page/layout",
  titleSffix: r2Common.suffixTitle,
  homeLink: {
    label: _react2.default.createElement(_icon2.default, { type: 'home' }),
    link: '/'
  }
};

module.exports = ModuleComponent;
;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Breadcrumb, 'Breadcrumb', 'src/libs/ModuleComponent.jsx');

  __REACT_HOT_LOADER__.register(commonAction, 'commonAction', 'src/libs/ModuleComponent.jsx');

  __REACT_HOT_LOADER__.register(ModuleComponent, 'ModuleComponent', 'src/libs/ModuleComponent.jsx');
}();

;