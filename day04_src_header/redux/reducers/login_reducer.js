import {SAVE_USER_INFO, DELETE_USER_INFO} from '../action_types'

// console.log('localStorage',localStorage)
let user = JSON.parse(localStorage.getItem('user'));
let token = localStorage.getItem('token');

let INITSTATE = {
  user:user || {},
  token:token || '',
  isLogin:user && token ? true : false
}
export default function loginReducer(preState=INITSTATE, action) {
  // console.log(action)
  let {type, data} = action;
  let newState;
  switch (type) {
    case SAVE_USER_INFO:
      newState = {
        user: data.user,
        token:data.token,
        isLogin:true
      };
      return newState
    case DELETE_USER_INFO:
      newState = {
        user:'',
        token:'',
        isLogin:false
      };
      return newState
    default:
      return preState
  }
}