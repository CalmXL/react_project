import {SAVE_USER_INFO, DELETE_USER_INFO} from '../action_types'

export const saveUserInfoAction = values => {
  // 保存state中的信息到 loacl storage
  // localStorage 和 sessionStorage 属性允许在浏览器中存储 key/value 对的数据。
  // localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
  // localStorage 只支持 string 类型的存储。
  localStorage.setItem('user', JSON.stringify(values.user))
  localStorage.setItem('token', values.token)

  return {type:SAVE_USER_INFO,data:values}
}

export const deleteUserInfoAction = values => {

  localStorage.removeItem('user')
  localStorage.removeItem('token')

  return {type:DELETE_USER_INFO}
}