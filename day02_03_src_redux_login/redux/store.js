import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
// 引入 thunk 实现异步性
import thunk from 'redux-thunk'
// 引入 redux-devtools-extension ，可视化工具
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))