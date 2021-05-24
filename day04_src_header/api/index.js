/* 
  项目中所有的请求都由这个文件发出
  以后每当发请求之前，都要在该文件里添加一个真正发送请求的方法
*/
import jsonp from 'jsonp'
import myAxios from './myAxios'
import {BASE_URL,WEAHTER_KEY,WEATHER_Location} from '../config'
// import { message } from 'antd'


// 发起登录请求
export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`,{username,password})
// 获取商品列表请求
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)
// 获取天气信息
export const reqWeatherInfo = ()=>{
    const url = `https://geoapi.qweather.com/v2/city/lookup?location=${WEATHER_Location}&key=${WEAHTER_KEY}`;
    jsonp(url,'',(err,data)=>{
      console.log(err,data)
    })
}
