'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.about = about;

var _action = require('./action');

var actionCreator = _interopRequireWildcard(_action);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function about() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case actionCreator.REQUEST:
    case actionCreator.RECIEVE:
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(about, 'about', 'src/page/view/about/reducer.js');
}();

;