import React,{Component, createRef} from 'react'
import {Button, Card,Form,Input,message,Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'

import {reqCategoryList,reqAddProduct,reqProductById,reqUPdateProduct} from '../../api'
import PicturesWall from './pictures_wall'
import RichTextEditor from './rich_text_editor'

const {Item} = Form
const {Option} = Select

@connect(
  state => ({
    categoryList:state.categoryList,
    productList:state.productList
  }),
  {}
)
class AddUpdate extends Component{

  formRef = createRef()
  picRef = createRef()
  richRef = createRef()
  state={
    categoryList:[],// 用来存分类的
    operType:'', // 用来保存 add\update 的状态
    _id:'',
    categoryId:'',
    name:'',
    desc:'',
    price:'',
    detail:''
  }

  componentDidMount(){
    // ! 判断 redux 中是否存有 分类列表 有的话,遍历到商品分类, 没有的话,发送请求
    const reduxCategoryList = this.props.categoryList
    const reduxProductList = this.props.productList
    if(reduxCategoryList.length) this.setState({categoryList:reduxCategoryList})
    else this.getCategoryList()
    // ! 获取参数id,判断是add 还是 update
    const id = this.props.match.params.id 
    if(id){
      this.setState({operType:'update',_id:id})
      if(reduxProductList.length){ // redux中存有商品列表
        let result = reduxProductList.find((item)=>{
          return item._id === id
        })
        console.log(result)
         // ! 注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。
         this.picRef.current.setFileList(result.imgs) // 用来回显图片
         this.richRef.current.setRichText(result.detail)// 用来回显富文本编辑器
         this.formRef.current.setFieldsValue({...result})
      }else{
        // 发请求获取商品
        this.getProduct(id)
      }
    }else{
      this.setState({operType:'add'})
    }
  }

  getProduct = async(productId)=>{
    let result = await reqProductById(productId)
    const {status,data,msg} = result
    if(status === 0){
      this.picRef.current.setFileList(data.imgs) // 用来回显图片
      this.richRef.current.setRichText(data.detail)
      this.formRef.current.setFieldsValue({...data})
    }
    else{
      message.error(msg,1)
    }
  }

  // 请求分类列表
  getCategoryList = async()=>{
    let result = await reqCategoryList()
    
    const{status,data,msg} = result
    if(status === 0) this.setState({categoryList:data})
    else message.error(msg,1)
  }
  // ? 提交 -- 修改or添加
  onFinish = async(values)=>{
    // console.log(this.picRef.current.getPicArr())
    // console.log(this.richRef.current.getRichText())
    const {operType,_id} = this.state
    let imgs = this.picRef.current.getPicArr()
    // console.log(imgs)
    let richText = this.richRef.current.getRichText()
    // ? 操作状态: add
    if(operType === 'add'){
      console.log('---add---')
      let result = await reqAddProduct({...values,imgs,detail:richText})
      const {status,msg} = result
      if(status === 0){
        message.success('商品添加成功')
        this.props.history.goBack()
      }
      else message.error(msg,1)
    }
    // ? 操作状态: update
    if(operType === 'update'){
      console.log('---update----')
      let result = await reqUPdateProduct({...values,imgs,detail:richText,_id})
      const {status,msg} = result
      if(status === 0){
        message.success('商品修改成功')
        this.props.history.goBack()
      }
      else message.error(msg,1)
    }
  }

  onFinishFailed = ()=>{
    console.log('提交失败')
  }

  render(){ 
    return(
      <Card 
        title={
          <div>
            <Button type="link" onClick={()=>{this.props.history.goBack()}}>
              <ArrowLeftOutlined />
            </Button>
            {this.state.operType === 'add' ? '商品添加' : '商品修改'}
          </div>
        } 
      >
        <Form
          labelCol={{md:1.5}}
          wrapperCol={{md:7}}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          ref={this.formRef}
        >
          <Item 
            label="商品名称" 
            name="name" 
            rules={[{ required: true }]}
          >
            <Input 
              placeholder="商品名称"
            />
          </Item>
          <Item label="商品描述" name="desc" rules={[{ required: true }]}>
            <Input placeholder="商品描述"/>
          </Item>
          <Item label="商品价格" name="price" rules={[{ required: true }]}>
            <Input 
              type="number"
              placeholder="商品价格"  
              prefix="￥" 
              addonAfter="RMB" 
            />
          </Item>
          <Item label="商品分类" name="categoryId" rules={[{ required: true }]}>
            <Select>
              <Option value="selectCategory">请选择分类</Option>
              {
                this.state.categoryList.map((item)=>{
                  return <Option key={item._id} value={item._id}>{item.name}</Option>
                })
              }
            </Select>
          </Item>
          <Item label="商品图片" name="imgs" wrapperCol={{md:9}}>
            <PicturesWall ref={this.picRef}/>
          </Item>
          <Item label="商品详情" name="detail" wrapperCol={{md:16}}>
            <RichTextEditor ref={this.richRef}/> 
          </Item>
          <Item>
            <Button type='primary' htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>

      )
  }
}
export default AddUpdate