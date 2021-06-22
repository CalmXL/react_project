/* eslint-disable array-callback-return */
import React,{Component} from 'react'
import { Menu } from 'antd';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import logo from '../../../static/imgs/logo.png'
import {menuList} from '../../../config/menu_config'
import {saveTitleAction} from '../../../redux/action_creators/save_title'
import './css/left_nav.less'

const { SubMenu, Item } = Menu;

@connect(
  state=>({
    menusList:state.userInfo.user.role.menus,
    userName:state.userInfo.user.username
  }),
  {saveTitle:saveTitleAction}
)
@withRouter
class LeftNav extends Component{

    componentDidMount() {
      // console.log(this.props)
    }

    // ? 判断是否授权展示的函数
    hasAuth = (item)=>{
      const {userName,menusList} = this.props
      // ? 判断是不是admin登录
      if(userName === 'admin') return true
      // ? 如果该key没有孩子
      else if(!item.children){
        return menusList.find((item2)=>{
          return item2 === item.key
        })
      // ? 如果有孩子
      }else if (item.children) {
        return item.children.some((item3)=>{
          return menusList.indexOf(item3.key) !== -1
        })
      }
    }


    // ? 一个创建左侧导航的函数
    createMenu = (target)=>{ 
      
        return target.map((item) => {
          if(this.hasAuth(item)) {
            if(!item.children){
                return (
                  <Item onClick={()=>{this.props.saveTitle(item.title)}} key={item.key} icon={item.icon}>
                    <Link to={item.path}>
                      {item.title}
                    </Link>
                  </Item>
                )
              
            }else{
              return(
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {
                    this.createMenu(item.children)
                  }
                </SubMenu>
              )
           }
          }
        })
      
     
    }

    render(){
      let {pathname} = this.props.location
        return(
          <div>
            <header className="nav-header">
              <img src={logo} alt='logo'/>
              <h1>商品管理系统</h1>
            </header>
            <div>
              <Menu
                defaultSelectedKeys={pathname.indexOf('product') !== -1 ? 'product' : pathname.split('/').reverse()[0]}
                defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
                mode="inline"
                theme="dark"
                // inlineCollapsed={this.state.collapsed}
              >
               {
                 this.createMenu(menuList)
               }
              </Menu>
            </div>
          </div>
        )
    }
}

export default LeftNav