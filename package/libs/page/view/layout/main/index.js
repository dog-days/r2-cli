'use strict';

var _css = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css2 = require('antd/lib/menu/style/css');

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModuleComponent = require('src/libs/ModuleComponent');

var _ModuleComponent2 = _interopRequireDefault(_ModuleComponent);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_Component) {
  _inherits(View, _Component);

  function View(props) {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      _get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'render', this).call(this);
      return _react2.default.createElement(
        'div',
        { className: 'r2-layout' },
        _react2.default.createElement(
          _menu2.default,
          { onClick: this.handleClick, mode: 'horizontal', theme: 'dark' },
          _react2.default.createElement(
            _menu2.default.Item,
            { key: 'demo' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '' + r2Common.prefixUrl },
              r2fn.t("R2框架")
            )
          ),
          _react2.default.createElement(
            _menu2.default.Item,
            { key: 'home' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '' + r2Common.prefixUrl },
              r2fn.t("主页")
            )
          ),
          _react2.default.createElement(
            _menu2.default.Item,
            { key: 'about' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: r2Common.prefixUrl + '/about' },
              r2fn.t("关于")
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'r2-breadcrumb' },
          this.breadcrumb || ""
        ),
        _react2.default.createElement(
          'div',
          { className: 'r2-contents' },
          this.props.children || ""
        )
      );
    }
  }]);

  return View;
}(_ModuleComponent2.default);

var ReduxView = (0, _reactRedux.connect)(function (state) {
  return {};
})(View);
ReduxView.defaultProps = Object.assign({}, _ModuleComponent2.default.defaultProps, {
  homeLink: {
    label: _react2.default.createElement(_icon2.default, { type: 'home' }),
    link: '/'
  }
});
module.exports = ReduxView;
;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(View, 'View', 'src/page/view/layout/main/index.jsx');

  __REACT_HOT_LOADER__.register(ReduxView, 'ReduxView', 'src/page/view/layout/main/index.jsx');
}();

;