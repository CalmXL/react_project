import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route,Redirect,Switch} from 'react-router-dom'
import { Layout } from 'antd'

import {deleteUserInfoAction} from '../../redux/action_creators/login_actions'
import Header from './header/header'
import Home from '../../components/home/home'
import Category from '../../containers/category/category'
import Product from '../../containers/product/product'
import Details from '../../containers/product/details'
import AddUpdate from '../../containers/product/add_update'
import User from '../../containers/user/user'
import Role from '../../containers/role/role'
import Bar from '../../containers/bar/bar'
import Line from '../../containers/line/line'
import Pie from '../../containers/pie/pie'
import LeftNav from './left_nav/left_nav'

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

  render(){
    const {isLogin} = this.props.userInfo
    if(!isLogin){
      return  <Redirect to='/login'/>
    }
    return(
      <Layout className="admin">
        <Sider className="sider">
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content className="content">
            <Switch>
              <Route path='/admin/home' component={Home}/>
              <Route path='/admin/prod_about/category' component={Category}/>
              <Route path='/admin/prod_about/product' component={Product} exact/>
              <Route path='/admin/prod_about/product/details/:id' component={Details}/>
              <Route path='/admin/prod_about/product/add_update' component={AddUpdate} exact/>
              <Route path='/admin/prod_about/product/add_update/:id' component={AddUpdate}/>
              <Route path='/admin/user' component={User}/>
              <Route path='/admin/role' component={Role}/>
              <Route path='/admin/charts/bar' component={Bar}/>
              <Route path='/admin/charts/line' component={Line}/>
              <Route path='/admin/charts/pie' component={Pie}/>
            </Switch>
          </Content>
          <Footer className="footer">
            推荐使用chorme浏览器，获取最佳用户体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin