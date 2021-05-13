import {INCREMENT,DECREMENT} from './action_types'
// reducer:根据action的type和data，决定怎么操作状态
// 1.初始化调用 2.更新状态调用
let initState = 0; // 设置初始化状态
export default function operaCount(preState=initState, action) {
  // 规则：在 reducer 中 不可以改变传递过来的参数
  console.log('-----reducer-------diaoyong',action)
  // 根据action的type和data，决定怎么操作状态
  const {type, data} = action
  let newState;
  switch (type) {
    case INCREMENT:
      newState = preState + data
      return newState
    case DECREMENT:
      newState = preState - data
      return newState
    default:
      break;
  }
  return preState
}


  

   