import React,{Component} from 'react'
import {Card,Button,Table,Form,Modal,Input,Select, message} from 'antd'
import dayjs from 'dayjs'

import {PAGE_SIZE} from '../../config' 
import {reqUserList,reqAddUser,reqUpdateUser,reqDeleteUser} from '../../api'
import { createRef } from 'react'

const{ Item } = Form
const { Option } = Select;

export default class User extends Component{

  FormRef = createRef()

  state={
    isCreateUser:false, // 创建用户弹窗-是否显示
    deleteUserShow:false,// 删除用户弹窗
    addOrUpdate:'', // 用来存储判断是更新还是添加用户
    userList:[], // 用户列表存储
    roleList:[], // 角色列表存储
    username:'',
    password:'',
    phone:'',
    email:'',
    role_id:'',
    _id:''
  }

  componentDidMount(){
    // 请求用户列表
    this.getUserList()
  }

  // 发请求-获取用户列表
  getUserList = async()=>{
    let result = await reqUserList()
    const {status,data,msg} = result 
    if(status === 0){
      message.success('用户列表请求成功')
      this.setState({
        userList:data.users,
        roleList:data.roles
      })
    }else message.error(msg,1)
  }

  // ? 创建用户-点击事件
  createUser = ()=>{
    this.setState({
      isCreateUser:true,
      addOrUpdate:'add'
    })
  }
  // ? 创建\更新用户-确认事件
  createUserOK = async()=>{
    // ?  发请求-添加用户
    const {addOrUpdate} = this.state
    const{username,password,email,phone,role_id,_id} = this.state
    if(addOrUpdate === 'add'){
      let result = await reqAddUser({username,password,email,phone,role_id})
      const {status,msg} = result
      if(status === 0){
        message.success('添加用户成功')
        this.setState({isCreateUser:false})
        this.getUserList()
      }else message.error(msg,1)
    }
    // ? 发请求-更新用户
    if(addOrUpdate === 'update'){
      let result = await reqUpdateUser({username,email,phone,role_id,_id})
      const {status,msg} = result
      if(status === 0){
        message.success('用户更新成功')
        this.setState({isCreateUser:false})
        this.getUserList()
      }else message.error(msg,1)
    }
    
  }
  // ? 创建\更新用户-取消事件
  createUserCancel =()=>{
    this.setState({
      isCreateUser:false
    })
  }
  // ? 添加用户-表单改变的回调
  onValuesChange = (_,allValues)=>{
    this.setState({...allValues})
  }
  // ? 选择框-变化的回调
  onSelectChange = (option)=>{
    this.setState({role_id:option})
  }
  // ? 添加用户表单提交且验证成功
  onFinish = ()=>{
    console.log('---onFinish----')
  }
  // ? 添加用户表单提交且验证失败
  onFinishFailed = ()=>{
    message.error('表单提交失败')
  }
  // ? 修改点击 -- 回调函数
  revamp = (id)=>{
    this.setState({
      isCreateUser:true,
      addOrUpdate:'update',
      _id:id
    })
    let result = this.state.userList.find((item)=>{
      return item._id === id
    })
    if(result){
      setTimeout(() => {
        this.FormRef.current.setFieldsValue({...result});
      })
    }
  }
  // ? 删除点击 -- 回调函数
  delete = (id)=>{
    this.setState({
      deleteUserShow:true,
      _id:id
    })
  }

  // ? 删除用户弹窗-ok按钮
  deleteUserrOK = async()=>{
    const {_id} = this.state
    let result = await reqDeleteUser(_id);
    const {status,msg} = result;
    if(status === 0){
      message.success('删除用户成功')
      this.setState({
        deleteUserShow:false
      })
      this.getUserList()
    }else message.error(msg,1)
  }

  // ? 删除用户弹窗-cancel按钮
  deleteUserCancel = ()=>{
    this.setState({deleteUserShow:false})
  }
  
  render(){
    const dataSource = this.state.userList;
    
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=> dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss ')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(_id)=>{
          let result = this.state.roleList.find((item)=>{
            return item._id === _id
          })
          return result ? result.name : null
        }
      },
      {
        title: '操作',
        // dataIndex: 'oper',
        key: 'oper',
        render:(item)=>{
          return(
            <div>
              <Button type="link" onClick={()=>{this.revamp(item._id)}}>修改</Button>
              <Button type="link" onClick={()=>{this.delete(item._id)}}>删除</Button>
            </div>
          )
        }
      },
    ]
      return(
        <div>
          <Card 
            title={
              <Button type="primary" onClick={this.createUser}>
                创建用户  
              </Button>
            }
          >
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              bordered
              rowKey='_id'
              pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
            />;
          </Card>
          <Modal 
            title="添加用户" 
            visible={this.state.isCreateUser} 
            onOk={this.createUserOK} 
            onCancel={this.createUserCancel}
          >
            <Form
              labelCol={{ span: 3}}
              wrapperCol={{span: 16}}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref={this.FormRef}
              onValuesChange={this.onValuesChange}
            >
              <Item name='username' label='用户名'>
                <Input placeholder='请输入用户名'/>
              </Item>
              {
                this.state.addOrUpdate === 'add' ? (
                  <Item  name='password' label='密码'>
                    <Input  placeholder='请输入密码'/>
                  </Item>
                ):''
              }
              
              <Item name='phone' label='手机号'>
                <Input placeholder='请输入手机号'/>
              </Item>
              <Item name='email' label='邮箱'>
                <Input placeholder='请输入邮箱'/>
              </Item>
              <Item  name='role_id' label='角色' rules={[{required:true}]}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择角色"
                  onChange={this.onSelectChange}
                >
                  {
                   this.state.roleList.map((item)=>{
                      return <Option key={item._id} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
              </Item>
            </Form>
          </Modal>
          <Modal
            title="删除用户"
            visible={this.state.deleteUserShow}
            onOk={this.deleteUserrOK} 
            onCancel={this.deleteUserCancel}
          >
            {

              `是否删除此用户`
            }
          </Modal>
        </div>
      )
  }
}
