import React,{Component} from 'react'
import {Card,Button,Select,Input,Table, message} from 'antd'
import {connect} from 'react-redux'
import {PlusSquareOutlined,SearchOutlined} from '@ant-design/icons'
import {reqProductList,reqProductUpdateStatus,reqSearchProduct} from '../../api'
import {PAGE_SIZE} from '../../config'
import {saveProductList} from '../../redux/action_creators/save_product_list'

const { Option } = Select;

@connect(
  state => ({}),
  {
    saveProductList:saveProductList
  }
)
class Product extends Component{

    state = {
      productList:[],// 商品列表(分页)
      total:'', // 数据总数
      number:1, // 当前点击的页数
      searchType:'productName', // 搜索类型
      keyWord:'', // 搜索关键字
      isSearch:false
    }

    componentDidMount(){
      this.getProductList()
    }
    // 获取商品分页列表
    getProductList = async(number=1)=>{
      console.log('---getProductList---')
      const {isSearch} = this.state

      if(isSearch) {
        this.setState({number:number})
        setTimeout(() => {
          this.search()
        })
      }
      else{
        let result = await reqProductList(number,PAGE_SIZE)
        const {status,data,msg} = result
        if(status === 0){
          message.success('获取商品分页列表成功')
          this.setState({
            productList:data.list,
            total:data.total,
            number:number
          })
          // 保存商品分页列表到 redux
          this.props.saveProductList(data.list)
        }else{
          message.error(msg,1)
        }
      }
    }
    // 分页监听
    /* paginationChange = (number)=>{
      console.log('---paginationChange---',number)
      this.setState({number:number})
      const {isSearch} = this.state
      if(isSearch){
        setTimeout(() => {
          this.search()
        })
      }else{
        this.getProductList(number)
      }
    } */
    // 更新商品状态
    productUpdateStatus = async({_id,status})=>{
      if(status === 1) status = 2
      else status = 1
      console.log(status)
      let result = await reqProductUpdateStatus(_id,status)
      const resStatus = result.status
      if(resStatus === 0) {
        message.success('更新商品状态成功')
        
        let productList = [...this.state.productList]
        productList.map((item)=>{
          if(item._id === _id){
            item.status = status
          }
          return item
        })
        this.setState({productList})
      }  
      
      else message.error('商品状态更新失败',1)
    }
    // 搜索请求
    search = async()=>{
      // console.log('----search----')
      const {searchType,keyWord,number} = this.state
      console.log(searchType,keyWord,number)
      let result = await reqSearchProduct(number,PAGE_SIZE,searchType,keyWord)
      const{status,data,msg} = result
      if(status === 0){
        // message.success('搜索请求成功',1)
        console.log('搜索请求成功')
        this.setState({
          productList:data.list,
          total:data.total,
          isSearch:true
        })
      }else{
        message.error(msg,1)
      }
    }

    render(){
      const dataSource = this.state.productList
      const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          width:'18%',
          key: 'name',
        },
        {
          title: '手机描述',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
          title: '手机价格',
          dataIndex: 'price',
          align: 'center',
          width:'9%',
          key: 'price',
          render: price => '￥'+price 
        },
        {
          title: '状态',
          // dataIndex: 'status',
          align: 'center',
          width:'10%',
          key: 'status',
          render:(item)=>{
            const {status} = item
            return(
            <div>
              <Button 
                type='primary'
                danger={status === 1 ? true : false}
                onClick={()=>{this.productUpdateStatus(item)}}
              >
                {status === 1 ? '下架' : '上架'}
              </Button><br/>
              <span>{status === 1 ? '在售' : '已停售'}</span>
            </div>
            )
          }
        },
        {
          title: '操作',
          // dataIndex: 'opera,'
          align: 'center',
          width:'10%',
          key: 'opera',
          render: (item)=>{
          
            return(
              <div>
                <Button 
                  type='link' 
                  onClick={()=>{this.props.history.push(`/admin/prod_about/product/details/${item._id}`)}}
                >
                  详情
                </Button><br />
                <Button 
                  type='link'
                  onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update/jkjhjhk')}}
                >
                  修改
                </Button>
              </div>
            )
          }
        },
      ];


      return(
          <div>
            <Card 
              title={
                <div>
                  <Select 
                    defaultValue="productName"
                    onChange={(value)=>{this.setState({searchType:value})}}
                  >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                  </Select>
                  <Input 
                    style={{margin:'0px 10px',width:'20%'}} 
                    placeholder='关键字'
                    allowClear
                    onChange={(event)=>{this.setState({keyWord:event.target.value})}}
                  />
                  <Button 
                    type='primary' 
                    icon={<SearchOutlined />}
                    onClick={this.search}
                  >
                  搜索
                  </Button>
                </div>  
              } 
              extra={
                <Button 
                  type='primary' 
                  icon={<PlusSquareOutlined />}
                  onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}
                >
                添加
                </Button>
              }
            >
            <Table 
              dataSource={dataSource} 
              columns={columns}  
              bordered
              rowKey='_id'
              pagination={{
                total:this.state.total,
                pageSize:PAGE_SIZE,
                current:this.state.number,
                onChange:this.getProductList
                }}
            />;
            </Card>
          </div>
        )
    }
}
export default Product