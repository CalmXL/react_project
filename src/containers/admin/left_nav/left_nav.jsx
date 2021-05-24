import React,{Component} from 'react'
import { Menu } from 'antd';
import {Link} from 'react-router-dom'

import logo from '../../../static/imgs/logo.png'
import menuList from '../../../config/menu_config'
import './css/left_nav.less'

const { SubMenu, Item } = Menu;

export default class LeftNav extends Component{

    createMenu = (target)=>{  
      return target.map((item)=>{
        if(!item.children){
          return (
            <Item key={item.key} icon={item.icon}>
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
      })
    }

    render(){
        return(
          <div>
            <header className="nav-header">
              <img src={logo} alt='logo'/>
              <h1>商品管理系统</h1>
            </header>
            <div>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
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