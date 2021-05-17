import {TEST1,TEST2} from '../action_types'

let INITSTATE = 'hello'
export default function testReducer(preState=INITSTATE, action) {
  console.log(action)
  let {type, data} = action;
  let newState;
  switch (type) {
    case TEST1:
      newState = preState + data;
      return newState
    case TEST2:
      newState = preState + '!';
      return newState
    default:
      return preState
  }
}