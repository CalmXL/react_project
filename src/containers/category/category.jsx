import React,{Component} from 'react'
import { Card, Button, Table, message,Modal } from 'antd';
import {PlusSquareOutlined} from '@ant-design/icons'
import {Form,Input} from 'antd'
import {connect} from 'react-redux'

import {reqAddCategory,reqCategoryList,reqUpdateCategory} from '../../api'
import {saveCategoryList} from '../../redux/action_creators/category_action'
import {PAGE_SIZE} from '../../config'

@connect(
  state => ({}),
  {
    saveCategoryList:saveCategoryList
  }
)
class Category extends Component{

    formRef = React.createRef() // 通过ref可以获取表单实例

    state = {
      categoryList:[],// 获取商品分类列表
      visible:false,// 控制弹窗的展示隐藏
      operType:'',// 操作类型（修改？添加）
      isloading:true, // table 加载动作的判断
      categoryId:'',// 要修改的分类的Id
      
    }
     componentDidMount(){
      // 发送请求，获取商品数据
      this.getCategoryList()
    }
   
    // 获得商品列表数据
    getCategoryList = async()=>{
      let result = await reqCategoryList()
      this.setState({isloading:false})
      const {status, data ,msg} = result
      if (status === 0) {
        this.setState({categoryList:data.reverse()})
        this.props.saveCategoryList(data)
      }
      else message.error(msg, 1)
    }
    // 展示弹窗-添加分类
    showAdd = () => {
      this.setState({
        visible:true,
        operType:'add'
      })
    };
    // 展示弹窗-修改分类
    showUpdate = (item) => {
      const {name,_id} = item;
      this.setState({
        visible:true,
        operType:'update',
        categoryId:_id
      })
      setTimeout(() => {
        // ! setFieldsValue 需要使用组件挂载,使用setTimeout进行异步操作,回显
        this.formRef.current.setFieldsValue({
          category:name
        })
      })
    }
   
    // 执行添加
    toAdd = async(category) => {
      const{status,data,msg} = await reqAddCategory(category)
      if(status === 0){
        message.success('商品新增分类成功')
        let categoryList = [...this.state.categoryList]
        categoryList.unshift(data)//将新添加的数据放入状态数组的前边
        this.setState({categoryList}) //更新状态
        this.formRef.current.resetFields() // 重置表单
        this.setState({visible:false}) // 隐藏modal
      }else{
        message.error(msg,1)
      }
    }
    // 执行修改
    toUpdate = async(categoryId,categoryName)=>{
      const{status,msg} = await reqUpdateCategory(categoryId,categoryName)
      if(status === 0){
        message.success('商品修改分类成功')
        this.getCategoryList()// 重新请求数据
        this.formRef.current.resetFields() // 重置表单
        this.setState({visible:false}) // 隐藏modal
      }else{
        message.error(msg,1)
      }
    }

    // 弹窗确认的回调
    handleOk = () => {
      const{operType,categoryId} = this.state
      this.formRef.current.validateFields()
      .then(values => {
        const {category} = values
        if(operType === 'add') this.toAdd(category)
        if(operType === 'update') this.toUpdate(categoryId,category)
      })
      .catch(errorInfo => {
        const {category} = errorInfo.values
        if(category === undefined) message.warning('表单输入有误')
      });
    };
    // 弹窗取消的回调
    handleCancel = () => {
      this.setState({
        visible:false,
        operType:''
      })
      this.formRef.current.resetFields() 
    };

    render(){
      const dataSource = this.state.categoryList;
      const {operType} = this.state
      const columns = [
        {
          title: '分类名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '操作',
          // dataIndex: '_id',
          key: 'age',
          width:'25%',
          align:'center',
          render:(item)=>{return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>}
        },
      ];
      return(
        <div>
          <Card 
            extra={
            <Button
              onClick={this.showAdd}
              type='primary' 
              icon={<PlusSquareOutlined />}>添加
            </Button>}>
          <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered={true}
          pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}} 
          rowKey='_id'
          loading={this.state.isloading}
          />
          </Card>
          <Modal 
            title={operType === 'add' ? '添加分类' : '修改分类'} 
            visible={this.state.visible} 
            onOk={this.handleOk} 
            onCancel={this.handleCancel}
            okText='确定'
            cancelText='取消'
          >
          <Form
              onFinish = {this.onFinish}
              onFinishFailed={this.onFinishFailed}
              // name="normal_login"
              // className="login-form"
              ref={this.formRef} 
            >
              <Form.Item 
                name='category'
                rules={[
                  {
                    required: true,
                    message: '请输入你要添加的分类名!',
                  }
                ]}
               
              >
                <Input placeholder="请输入添加分类名"  />
              </Form.Item>
            </Form>
          </Modal>
        </div>      
      )
    }
}
export default Category