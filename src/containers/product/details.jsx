import React,{Component} from 'react'
import {Card,Button,List, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'

import {reqProductById,reqCategoryById} from '../../api'
import './css/details.less'
const {Item} = List

@connect(
  state => ({productList:state.productList,categoryList:state.categoryList}),
  {}
)
class Details extends Component{

    state = {
      categoryId:'',
      desc:'',
      detail:'',
      imgs:[],
      name:'',
      price:'',
      categoryName:'',
      isLoading:true
    }

    componentDidMount(){
      // 得到商品 id
      const ProdId = this.props.match.params.id
      const reduxProdList = this.props.productList
      const reduxCategoryList = this.props.categoryList
      let promise
      // 判断redux中是否有商品列表信息
      if(reduxProdList.length){
        let result = reduxProdList.find((item)=>item._id === ProdId)
        if (result) {
          this.setState({...result})
          this.categoryId = result.categoryId
        }
      }else promise = this.getProduct(ProdId) // 发送请求,获取商品详细信息
      
      // 判断redux中是否有商品分类信息
      if(reduxCategoryList.length){
        let categoryId = this.categoryId
        let result = reduxCategoryList.find((item)=>item._id === categoryId)
        if(result) this.setState({categoryName:result.name})
      }else{
        // 发送请求，获取商品分类信息
        if(promise){
          promise.then(()=>{
            const {categoryId} = this
            this.getCategory(categoryId)
          })
        }else{
          const {categoryId} = this
          this.getCategory(categoryId)
        } 
      }
    }
    
    getCategory = async(categoryId)=>{
      console.log(categoryId)
      let result = await reqCategoryById(categoryId)
      const {status,data,msg} = result
      if(status === 0){
        this.setState({categoryName:data.name,isLoading:false})
        
      }else{
        message.error(msg,1)
      }
    }

    // redux中没有商品信息，重新发送请求方法
    getProduct = async(id)=>{
      let result = await reqProductById(id)
      const {status,data} = result
      console.log(data)
      if(status === 0){
        this.categoryId = data.categoryId
        this.setState({...data})
        return Promise.resolve()
      }else{
        message.error('网络请求错误')
      }
     
    }

    render(){
      const {desc,detail,imgs,name,price,categoryName} = this.state
        return(
            <Card 
              title={
                <div>
                  <Button 
                    type='link'
                    onClick={()=>{this.props.history.goBack();this.setState({})}} 
                  >
                    <ArrowLeftOutlined />
                  </Button>
                  <span>商品详情</span>
                </div>
              }
              loading={this.state.isLoading}
            >
             <List className="list">
              <Item className="item">
                <span className="item-left">商品名称：</span>
                <span>{name}</span>
              </Item>
              <Item className="item">
                <span className="item-left">商品描述：</span>
                <span>{desc}</span>
              </Item>
              <Item className="item">
                <span className="item-left">商品价格：</span>
                <span>{price}</span>
              </Item>
              <Item className="item">
                <span className="item-left">所属分类：</span>
                <span>{categoryName}</span>
              </Item>
              <Item className="item">
                <span className="item-left">商品图片：</span>
                {
                  imgs.map((item,index)=>{
                    return <img key={index} src={`/upload/` + item} alt="商品图片" />
                  })
                }
              </Item>
              <Item className="item">
                <span className="item-left">商品详情：</span>
                <span dangerouslySetInnerHTML={{__html:detail}}></span>
              </Item>
             
             </List>
            </Card>
        )
    }
}
export default Details