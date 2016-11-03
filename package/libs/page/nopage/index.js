'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./style.css');

var NoPage = function (_React$Component) {
  _inherits(NoPage, _React$Component);

  function NoPage(props) {
    _classCallCheck(this, NoPage);

    return _possibleConstructorReturn(this, (NoPage.__proto__ || Object.getPrototypeOf(NoPage)).call(this, props));
    // console.debug(props)
  }

  _createClass(NoPage, [{
    key: 'goBack',
    value: function goBack() {
      var _this2 = this;

      return function () {
        _this2.props.history.goBack();
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { className: 'center nopage-con' },
        _react2.default.createElement(
          'article',
          null,
          _react2.default.createElement(
            'h1',
            { className: 'header' },
            '404'
          ),
          _react2.default.createElement(
            'p',
            { className: 'error' },
            'ERROR'
          )
        ),
        _react2.default.createElement(
          'article',
          null,
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                '\u8FD4\u56DE\u4E3B\u9875'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: 'javascript:void(0)', onClick: this.goBack() },
                '\u8FD4\u56DE'
              )
            )
          )
        )
      );
    }
  }]);

  return NoPage;
}(_react2.default.Component);

module.exports = NoPage;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NoPage, 'NoPage', 'src/page/nopage/index.jsx');
}();

;