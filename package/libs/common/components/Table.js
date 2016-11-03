'use strict';

var _css = require('antd/lib/pagination/style/css');

var _pagination = require('antd/lib/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _css2 = require('antd/lib/table/style/css');

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModuleComponent2 = require('src/libs/ModuleComponent');

var _ModuleComponent3 = _interopRequireDefault(_ModuleComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *  Table 
 * @prop {Object} dataSet 表格dataSet,每个view中的dataSet的require的文件,请先了解view模块中dataSet的作用 
 * @prop {Object} data api中返回的数据,data.entries是固定的二维数组结果，表格要展示的数据 
 * @prop {Boolean} loading 是否现在加载状态 
 * @prop {String} className 类名 
 * @prop {Function} handlePagination(page) 分页点击切换回调函数 
 */
var Component = function (_ModuleComponent) {
  _inherits(Component, _ModuleComponent);

  function Component(props) {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));
  }

  _createClass(Component, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var nextState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      //if(this.props.loading !== nextProps.loading){
      //return true;
      //}
      return r2fn.shouldDataUpdate(this.props, nextProps, 'data');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var dataSet = _props.dataSet;
      var data = _props.data;
      var loading = _props.loading;
      var handlePagination = _props.handlePagination;

      var other = _objectWithoutProperties(_props, ['dataSet', 'data', 'loading', 'handlePagination']);

      var targetData;
      if (data) {
        targetData = data.toJS();
        var dataSource = dataSet.dataAdapter(targetData.entries);
        if (dataSet.getCurrentComponent && parent) {
          dataSet.getCurrentComponent(parent, targetData.entries);
        }
      }
      console.debug("table-render", loading);
      return _react2.default.createElement(
        'div',
        other,
        _react2.default.createElement(_table2.default, { className: 'mt15', columns: dataSet.columns, loading: loading,
          dataSource: dataSource, size: 'middle', bordered: true, pagination: false }),
        dataSource && targetData.total >= 2 * targetData.size && _react2.default.createElement(_pagination2.default, { onChange: handlePagination, className: 'mt15 fr',
          defaultCurrent: targetData.current, current: targetData.current,
          defaultPageSize: targetData.size, total: targetData.total })
      );
    }
  }]);

  return Component;
}(_ModuleComponent3.default);

Component.propTypes = {
  dataSet: _react2.default.PropTypes.object,
  data: _react2.default.PropTypes.object,
  loading: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  handlePagination: _react2.default.PropTypes.func
};
module.exports = Component;
;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Component, 'Component', 'src/common/components/Table.jsx');
}();

;