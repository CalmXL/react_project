import {SAVE_PRODUCT_LIST} from '../action_types'

let INITSTATE = []
export default function product_reducer(preState=INITSTATE, action) {
  
  let {type, data} = action;
  let newState;
  switch (type) {
    case SAVE_PRODUCT_LIST:
      newState = [...data];
      return newState
    default:
      return preState
  }
}