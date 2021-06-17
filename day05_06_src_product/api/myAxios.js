import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring' 
import Nprogress from 'nprogress'
import store from '../redux/store'
import {deleteUserInfoAction} from '../redux/action_creators/login_actions'
import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout: 2000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 进度条开始
    Nprogress.start();
    // 从redux中获取token
    const {token} =store.getState().userInfo
    if(token) config.headers.Authorization = 'atguigu_' + token
  
    // console.log('config:  ',config.data)
    const {method} = config
    // 若是 post 请求
    if(method.toLowerCase() === 'post'){
      if(config.data instanceof Object){
        config.data = qs.stringify(config.data)
      }
    }
  
    return config;
  });

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // console.log('resSucess')
    // 若成功，走这里
    Nprogress.done()
    return response.data;
  },(error) => {
    // 若失败，走这里
    // console.log('resFailed')
    Nprogress.done()
    if(error.response.status === 401){
      message.error('身份效验失败，请重新登录',1);
      store.dispatch(deleteUserInfoAction())
    }else{
       // message.error(error.message,1)
    }
   
    return Promise.reject();
  });

export default instance