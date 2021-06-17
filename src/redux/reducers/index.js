import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menu_reducer from './menu_reducer'
import product_reducer from './product_reducer'
import category_reducer from './category_reducer'

export default combineReducers({
  // 该对象里的 key 决定着 store中里保存该状态的 key
  // 该对象的里的 value，决定着 store里保存该状态的 value
  userInfo:loginReducer,
  title:menu_reducer,
  productList:product_reducer,
  categoryList:category_reducer
})