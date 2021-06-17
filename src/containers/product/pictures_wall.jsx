import { Upload, Modal, message } from 'antd';
import React,{Component} from 'react'
import { PlusOutlined } from '@ant-design/icons';

import {BASE_URL} from '../../config'
import {reqDeletePicture} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };
  // 关闭预览窗
  handleCancel = () => this.setState({ previewVisible: false });
  // 展示预览窗
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  // 图片状态发生改变的回调
  handleChange = async({ file,fileList }) => {
    const {status,name} = file 
    if(status === 'done'){
      console.log(file)
      const {status,data,msg} =  file.response
      if(status === 0) {
        message.success('图片上传成功',1)
        fileList[fileList.length-1].url = data.url
        fileList[fileList.length-1].name = data.name
      }else{
        message.error(msg,1)
      }
    }
    if(status === 'removed'){
      console.log(name)
      let result = await reqDeletePicture(name)
      const {status,msg} = result
      if(status === 0) message.success('图片删除成功',1)
      else message.error(msg,1)
    }
    this.setState({ fileList });
  }
  // 获得图片数组
  getPicArr = ()=>{
    let arr = []
    this.state.fileList.forEach((item)=>{
      arr.push(item.name)
    })
    return arr
  }

  // 将数组传换为fileList
  setFileList = (arr)=>{
    arr.forEach((item,index)=>{
      this.state.fileList.push({
        uid:-index,
        name:item,
        url:`${BASE_URL}/upload/${item}`
      })
    })
    
  }


  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}// 接收图片服务器的地址
          method="POST"
          name="image"
          listType="picture-card"// 照片墙的展示方式
          fileList={fileList}// 图片列表
          onPreview={this.handlePreview}// 点击预览的按钮
          onChange={this.handleChange}// 图片状态改变的回调
        >
          {/* 隐藏上传按钮的图片的数量的阈值 */}
          {fileList.length >= 4 ? null : uploadButton}  
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
