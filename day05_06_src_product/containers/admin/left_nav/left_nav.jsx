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
  state=>({}),
  {saveTitle:saveTitleAction}
)
@withRouter
class LeftNav extends Component{

    componentDidMount() {
    }

   
    createMenu = (target)=>{  
      return target.map((item)=>{
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