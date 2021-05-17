import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {deleteUserInfoAction} from '../../redux/action_creators/login_actions'

class Admin extends Component{

  componentDidMount() {
    console.log('admin',this.props)
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
      <div>
        <div>我是Admin组件，你登录了，欢迎{this.props.userInfo.user.username}</div>
        <button onClick={this.logout}>退出登录</button>
      </div>
    )
  }
}

export default  connect(
  state =>({userInfo:state.userInfo}),
  {deleteUserInfo:deleteUserInfoAction}
)(Admin)
