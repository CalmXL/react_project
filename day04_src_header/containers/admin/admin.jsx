import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route,Redirect,Switch} from 'react-router-dom'
import { Layout } from 'antd'

import {reqCategoryList} from '../../api'
import {deleteUserInfoAction} from '../../redux/action_creators/login_actions'
import Header from './header/header'
import Home from '../../components/home/home'
import Category from '../../containers/category/category'
import Product from '../../containers/product/product'
import User from '../../containers/user/user'
import Role from '../../containers/role/role'
import Bar from '../../containers/bar/bar'
import Line from '../../containers/line/line'
import Pie from '../../containers/pie/pie'

import './css/admin.less'
const { Footer, Sider, Content } = Layout
@connect(
  state =>({userInfo:state.userInfo}),
  {deleteUserInfo:deleteUserInfoAction}
)
class Admin extends Component{

  componentDidMount() {
   
  }

  logout = ()=>{
    // 清空 redux 和 localstorage
    this.props.deleteUserInfo()
  }

  test = async()=>{
    let result = await reqCategoryList()
    console.log(result)
  }

  render(){
    const {isLogin} = this.props.userInfo
    if(!isLogin){
      return  <Redirect to='/login'/>
    }
    return(
      <Layout className="admin">
        <Sider className="sider">Sider</Sider>
        <Layout>
          <Header/>
          <Content className="content">
            <Switch>
              <Route path='/admin/home' component={Home}/>
              <Route path='/admin/prod_about/category' component={Category}/>
              <Route path='/admin/prod_about/product' component={Product}/>
              <Route path='/admin/user' component={User}/>
              <Route path='/admin/role' component={Role}/>
              <Route path='/admin/charts/bar' component={Bar}/>
              <Route path='/admin/charts/Line' component={Line}/>
              <Route path='/admin/charts/pie' component={Pie}/>
            </Switch>
          </Content>
          <Footer className="footer">
            推荐使用chorme浏览器，获取最佳用户体验
            <button onClick={this.test}>点我</button>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin