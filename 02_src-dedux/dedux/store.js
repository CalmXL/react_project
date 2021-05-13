// 从redux中引入createStore,用于创建核心的store
import {createStore} from 'redux'
// 引入reducer
import reducer from './reducer'

export default createStore(reducer)