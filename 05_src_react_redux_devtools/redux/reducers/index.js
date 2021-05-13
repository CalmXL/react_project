import counterReducer from './counter_reducer'
import presonReducer from './person_reducer'
import {combineReducers} from 'redux'

export default combineReducers({
  count:counterReducer,
  person:presonReducer,
})