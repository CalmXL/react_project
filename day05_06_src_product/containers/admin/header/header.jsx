import React,{Component} from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {withRouter} from 'react-router-dom'
import {menuList} from '../../../config/menu_config'
import {deleteUserInfoAction} from '../../../redux/action_creators/login_actions'
import {reqWeatherInfo} from '../../../api'
import './css/header.less'

@connect(
  state => ({userInfo:state.userInfo,getTitle:state.title}),
  {
    deleteUser:deleteUserInfoAction
  }
)
@withRouter
class Header extends Component{

  state = {
    isFull:false, // 屏幕初始状态
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss '), // display
    title:''
  }

  componentDidMount(){
    screenfull.on('change', () => { // 监听屏幕状态变化
      let isFull = !this.state.isFull
      this.setState({isFull})
    });
    // 每隔1s更新时间
    this.timer = setInterval(() => {
      this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss ')})
    }, 1000);
    // 请求天气
    this.getWeather() 

    this.getTitle()

  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  getWeather = async()=>{
    reqWeatherInfo()
  }

  // 切换全屏
  fullScreen = ()=>{
    // toggle:开关、触发
    screenfull.toggle() 
  }
  // 退出登录
  logOut = ()=>{
    let {deleteUser} = this.props
    const { confirm } = Modal;
    confirm({
      title: '确认退出？',
      content: '退出需重新登录',
      okText:'确认',
      cancelText:'取消',
      onOk() {
        deleteUser()
      },
      onCancel() {},
    });
  }

  getTitle = ()=>{
    let title = ''
    let {pathname} = this.props.location
    let keyName = pathname.split('/').reverse()[0];
    if(pathname.indexOf('product') !== -1) keyName = 'product'
   
    menuList.forEach((item) => {
      if(item.children instanceof Array){
        let objTitle = item.children.find((childrenItem)=>{
          return childrenItem.key === keyName
        })
        if(objTitle) title = objTitle.title
      }else{
        if(keyName === item.key){
          title =  item.title
        }
      }
    });
    this.setState({title})
  }
  
  render(){
    let {isFull} = this.state
    let {username} = this.props.userInfo.user;
    let {title} = this.props.getTitle
    return(
      <header className="header">
        <div className="header-top">
          <Button onClick={this.fullScreen} size="small" icon={isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />} />
          <span className="username">欢迎,{username}</span>
          <Button onClick={this.logOut} type="link">退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {
              title ? title : this.state.title
            }
          </div>
          <div className="header-bottom-right">
            {this.state.date}
            <img src="http://www.sinaimg.cn/dy/weather/main/index14/007/icons_42_yl/w_03_28_01.png" alt="" />
            <span>晴 温度：-2~15</span>
          </div>
        </div>
      </header>
    )
  }
} 

export default Header