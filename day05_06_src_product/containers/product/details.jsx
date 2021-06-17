import React,{Component} from 'react'
import {Card,Button,List, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'

import {reqProductById} from '../../api'
import './css/details.less'
const {Item} = List

@connect(
  state => ({productList:state.productList}),
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
    }

    componentDidMount(){
      // 得到商品 id
      const ProdId = this.props.match.params.id
      const reduxProdList = this.props.productList
      if(reduxProdList.length !== 0){
        let result = reduxProdList.find((item)=>{
          return item._id === ProdId
        })
        const {categoryId,desc,detail,imgs,name,price} = result
        this.setState({categoryId,desc,detail,imgs,name,price})

      }else{
        // 发送请求
        this.getProduct(ProdId)
      }
    }
    
    // redux中没有，重新发送请求方法
    getProduct = async(id)=>{
      let result = await reqProductById(id)
      const {status,data} = result
      if(status === 0){
        const {categoryId,desc,detail,imgs,name,price} = data
        this.setState({categoryId,desc,detail,imgs,name,price})
      }else{
        message.error('网络请求错误')
      }
     
    }

    render(){
      const {categoryId,desc,detail,imgs,name,price} = this.state
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
                <span>{categoryId}</span>
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