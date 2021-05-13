// 从redux中引入createStore,用于创建核心的store
import {createStore, applyMiddleware} from 'redux'
// 引入reducer
import reducer from './reducer'
// 引入redux-thunk
import thunk from 'redux-thunk'

export default createStore(reducer,applyMiddleware(thunk))