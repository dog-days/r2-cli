import { LOCATION_CHANGE } from 'react-router-redux'
import { routerReducer } from 'react-router-redux'

<!--reducer_import_begin-->
import { ${reducer} } from '${path}'
<!--reducer_import_end-->


if(useImmutable){
  var Immutable =  require('immutable');
  var combineReducers = require('redux-immutable').combineReducers;
  var initialState = Immutable.fromJS({
      locationBeforeTransitions: null
  });
  var routing = function(state, action){
      if(!state){
        state = initialState
      }
      if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
      }
      return state;
  }
} else{
  var combineReducers = require('redux').combineReducers;
  var routing = routerReducer;
}

var reducer = {
  <!--reducer_reducer_begin-->
  ${reducer},
  <!--reducer_reducer_end-->
  routing,
}

export default combineReducers(reducer);


