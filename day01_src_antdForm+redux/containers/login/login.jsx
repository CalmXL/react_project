import React,{Component} from 'react'
import { Form, Input, Button} from 'antd';
import { GitlabOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {test1Action,test2Action} from '../../redux/action_creators/test_actions'
import './css/login.less'
import logo from './imgs/logo.png'

 class Login extends Component{

    componentDidMount() {
      console.log(this.props)
    }

    onFinish = (value)=>{
      // 像服务器发送登录请求
      console.log('sucess:' + value)
      this.props.test2()
    } 
    onFinishFailed = (errorInfo)=>{
      console.log('Failed:', errorInfo);
    }

    pwdValidator = ()=>({
        validator(_, value) {
          if(!value){
            return Promise.reject(new Error('必须输入密码'))
          }else if(value.length < 4){
            return Promise.reject(new Error('密码长度必须大于等于4'))
          }else if(value.length > 12){
            return Promise.reject(new Error('密码长度必须小于等于12'))
          }else if(!(/^\w+$/).test(value)){
            return Promise.reject(new Error('密码必须是数字、字母、下划线'))
          }
  
          return Promise.resolve()
        }
      })
    
    render(){
      
      return(
        <div className='login'>
          <header>
            <img src={logo} alt="" />
            <h1>商品管理系统{this.props.test}</h1>
          </header>
          <section>
            <h1>用户登录</h1>
            <Form
              onFinish = {this.onFinish}
              onFinishFailed={this.onFinishFailed}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="username"
                /*
                用户名/密码的的合法性要求
                  1). 必须输入
                  2). 必须大于等于4位
                  3). 必须小于等于12位
                  4). 必须是英文、数字或下划线组成
                */
                rules={[
                  {required: true, message: '用户名必须输入',},
                  {max: 12, message: '用户名必须小于等于12位',},
                  {min: 4, message:'用户名必须大于等于4位'},
                  {pattern: /^\w+$/, message:'必须是英文、数字或下划线组成'},
                ]}
              >
                <Input prefix={<GitlabOutlined className="site-form-item-icon"/>} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  this.pwdValidator,
                {/*  () => ({
                        validator(_, value) {
                          if(!value){
                            return Promise.reject(new Error('必须输入密码'))
                          }else if(value.length < 4){
                            return Promise.reject(new Error('密码长度必须大于等于4'))
                          }else if(value.length > 12){
                            return Promise.reject(new Error('密码长度必须小于等于12'))
                          }else if(!(/^\w+$/).test(value)){
                            return Promise.reject(new Error('密码必须是数字、字母、下划线'))
                          }
                          return Promise.resolve()
                        },
                      }),
                */}
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      )
    }
}

export default connect(
  state => ({test:state.test}),
  {
    test1:test1Action,
    test2:test2Action
  }
)(Login)


