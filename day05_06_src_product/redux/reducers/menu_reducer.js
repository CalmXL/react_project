import {SAVE_TITLE} from '../action_types'

let INITSTATE = ''
export default function menu_reducer(preState=INITSTATE, action) {
  
  let {type, data} = action;
  let newState;
  switch (type) {
    case SAVE_TITLE:
      newState = {title:data};
      return newState
    default:
      return preState
  }
}