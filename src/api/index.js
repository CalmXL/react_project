/* 
  项目中所有的请求都由这个文件发出
  以后每当发请求之前，都要在该文件里添加一个真正发送请求的方法
*/
import jsonp from 'jsonp'
import myAxios from './myAxios'
import {BASE_URL,WEAHTER_KEY,WEATHER_Location} from '../config'


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
// 新增一个商品分类
export const reqAddCategory = (categoryName) => myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})

// 修改商品分类
export const reqUpdateCategory = (categoryId,categoryName) => 
myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})

// 请求商品分页列表
export const reqProductList = (pageNum,pageSize) => 
myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

// 对商品进行上架/下架处理
export const reqProductUpdateStatus = (productId,status) => 
myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})

//  根据Name/desc搜索产品分页列表
export const reqSearchProduct = (pageNum,pageSize,searchType,keyWord) => {
  console.log(pageNum,pageSize,searchType,keyWord)
  return myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})
}

/* {
  console.log(pageNum,pageSize,searchType,keyWord)
  if(searchType === 'name'){
    return myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,productName:keyWord}})
  }
  else myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,productDesc:keyWord}})
} */

// 根据商品id查询商品
export const reqProductById = (productId) => 
myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})
// 根据商品分类id查询分类
export const reqCategoryById = (categoryId) => 
myAxios.get(`${BASE_URL}/manage/category/info`,{params:{categoryId}})
// 根据商品name删除图片
export const reqDeletePicture = (name) => 
myAxios.post(`${BASE_URL}/manage/img/delete`,{name})

//  添加商品
export const reqAddProduct = (productObj) => {
  console.log(productObj)
  return myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj})
}

// 更新商品
export const reqUPdateProduct = (productObj) => {
  console.log(productObj)
  return myAxios.post(`${BASE_URL}/manage/product/update`,{...productObj})
}

// 请求获取角色列表
export const reqRoleList = () => 
myAxios.get(`${BASE_URL}/manage/role/list`)

// 添加角色
export const reqAddRole = (roleName)=> myAxios.post(`${BASE_URL}/manage/role/add`,{roleName})

// 更新角色功能
export const reqUpdateRole = (obj) => 
myAxios.post(`${BASE_URL}/manage/role/update`,{...obj,auth_time:Date.now()})

// 获取所有用户列表
export const reqUserList = () => 
myAxios.get(`${BASE_URL}/manage/user/list`)

// 添加用户
export const reqAddUser = (obj) => 
myAxios.post(`${BASE_URL}/manage/user/add`,{...obj})

// 更新用户
export const reqUpdateUser = (obj) =>{
  console.log(obj)
  return myAxios.post(`${BASE_URL}/manage/user/update`,{...obj})
} 

// 删除用户
export const reqDeleteUser = (userId) => 
myAxios.post(`${BASE_URL}/manage/user/delete`,{userId})









