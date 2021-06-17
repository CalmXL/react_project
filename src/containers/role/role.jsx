import React,{Component, createRef} from 'react'
import {Card,Button,Table,Modal,Input,Form, message} from 'antd'
import dayjs from 'dayjs'
import { Tree } from 'antd';

import {reqRoleList,reqAddRole} from '../../api'
import {menuList} from '../../config/menu_config'
import { TreeNode } from 'antd/lib/tree-select';

export default class Role extends Component{

  inputRef = createRef()

  state= {
    isAddAuth:false, // 设置添加角色弹窗
    isControl:false, // 设置权限弹窗
    roleList:[],
    // expandedKeys:[], // ? 配置是否默认打开某个节点
    checkedKeys:[],
    selectedKeys:[],
    menuList
  }
  
  componentDidMount(){
    // 发送获取角色列表请求
    this.getRoleList()
  }
  // 获取角色列表
  getRoleList = async()=>{
    let result = await reqRoleList()
    const {status,data,msg} = result
    if(status === 0){
      this.setState({roleList:data})
    }else{
      message.error(msg,1)
    }
  }
  // ? 添加角色
  showAdd = ()=>{
    this.setState({isAddAuth:true})
  }
  // ? 添加角色-确认按钮
  handleAuthOk = async()=>{
    // 获取 输入的角色名
    let roleName = this.inputRef.current.props.value
    let result = await reqAddRole(roleName)
    const {status,data,msg} = result
    if(status === 0) {
      message.success("添加角色成功")
      let roleList = [...this.state.roleList]
      roleList.unshift(data)
      this.setState({roleList,isAddAuth:false})
    }
    else message.error(msg,1)
   
  }
  // ? 添加角色-取消按钮
  handleAuthCancel = ()=>{
    this.setState({
      isAddAuth:false
    })
  }
  // ? 授权弹窗
  ShowControl = ()=>{
    this.setState({isControl:true})
  }
  // ? 授权弹窗-提交按钮
  handleControlOk = ()=>{
    this.setState({
      isControl:false
    })
  }
  // ? 授权弹窗-取消按钮
  handleControlCancel = ()=>{
    this.setState({
      isControl:false
    })
  }

  // ?  树形组件---start

  onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    this.setState({
      checkedKeys:checkedKeysValue
    })
  };

  onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    this.setState({
      selectedKeys:selectedKeysValue
    })
   
  };
    // ? 树形组件---end

  render(){

    const dataSource = this.state.roleList
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=>dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss ')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'address',
        render:(time)=>time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss ') : ''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render:()=>{
          return (
            <Button onClick={this.ShowControl} type='link'>
              设置权限
            </Button>
          )
        }
      },
    ];
    // ? 树形菜单的源数据
    const treeData = [
      {
        "title":"平台权限",
        "key":"top",
        "children": this.state.menuList
      }
    ]
    
   
    return(
      <div>
        <Card 
          title={
            <Button
              onClick = {this.showAdd}
              type='primary'
            >
              添加角色
            </Button>
          }  
        >
          <Table dataSource={dataSource} columns={columns} rowKey='_id' />
        </Card>
        <Modal 
          cancelText="取消"
          okText="确定"
          title="添加角色" 
          visible={this.state.isShow} 
          onOk={this.handleAuthOk} 
          onCancel={this.handleAuthCancel}
        >
          <Form
            onFinish = {this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item 
              label="添加角色"
              name='addRole'
              rules={[
                {
                  required: true,
                  message: '请输入你要添加的角色名!',
                }
              ]}
              
            >
              <Input  ref={this.inputRef} placeholder="请输入添加角色名"  />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          cancelText="取消"
          okText="确定"
          title="设置权限" 
          visible={this.state.isControl} 
          onOk={this.handleControlOk} 
          onCancel={this.handleControlCancel}
        >
          <Tree
            checkable // 允许选中
            onExpand={this.onExpand} // ? 收缩或者展开的回调
            // expandedKeys={this.state.expandedKeys} // ? 一上来就展开谁
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
            defaultExpandAll={true}
            treeData={treeData}
          />
        </Modal>
      </div>
      
    )
  }
}