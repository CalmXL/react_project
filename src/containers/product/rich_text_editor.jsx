import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './css/rich_text_editor.less'


export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(), // 构建一个初始化状态的编辑器+内容
  }

  getRichText = ()=>{
    const {editorState} = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // 用来回显rich_text
  setRichText = (html)=>{
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState})
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"//样式
          editorClassName="demo-editor"// 样式
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}