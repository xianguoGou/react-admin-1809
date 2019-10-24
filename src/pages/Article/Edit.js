import React, { Component, createRef } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Card,
  message
} from 'antd'

import moment from 'moment'

import E from 'wangeditor'

import {
  getArticleById
} from '../../requests'

import './edit.less'

const { Item: FormItem } = Form

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

@Form.create()
export default class EditArticle extends Component {
  constructor() {
    super()
    this.editorRef = createRef()
    this.state = {
      author: '',
      createAt: '',
      title: '',
      content: ''
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return message.error('请填写必填字段');
      }

      // const data = {
      //   ...values,
      //   createAt: values.createAt.format()
      // }
      const data = Object.assign({}, values, {
        createAt: values.createAt.format()
      })
      
      console.log(data)
    })
  }
  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange =  (html) => {
      // html 即变化之后的内容
      this.setState({
        content: html
      })
    }
    this.editor.create()
  }

  getData = () => {
    getArticleById(this.props.match.params.id)
      .then(resp => {
        if (resp.data.code === 200) {
          const {
            author,
            createAt,
            title,
            content
          } = resp.data.data
          this.setState({
            author,
            createAt,
            title,
            content
          }, () => {
            this.editor.txt.html(this.state.content)
          })
        }
      })
  }

  componentDidMount() {
    this.initEditor()
    this.getData()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        title={`编辑文章${this.props.location.state.title}`}
        bordered={false}
        style={{ margin: '16px' }}
      >
        <Form className="login-form">
          <FormItem
            label="文章标题"
            {...formItemLayout}
          >
            {
              getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入文章标题'
                  }
                ],
                initialValue: this.state.title
              })(
                <Input placeholder="文章标题" />
              )
            }
          </FormItem>
          <FormItem
            label="作者"
            {...formItemLayout}
          >
            {
              getFieldDecorator('author', {
                rules: [
                  {
                    required: true,
                    min: 2,
                    max: 4,
                    message: '请输入文章作者, 2-4位字符'
                  }
                ],
                initialValue: this.state.author
              })(
                <Input placeholder="作者" />
              )
            }
          </FormItem>
          <FormItem
            label="创建时间"
            {...formItemLayout}
          >
            {
              getFieldDecorator('createAt', {
                rules: [
                  {
                    required: true,
                    message: '请选择时间'
                  }
                ],
                initialValue: moment(this.state.createAt)
              })(
                <DatePicker
                  showTime      
                  style={{ width: '100%' }}
                />
              )
            }
          </FormItem>
          <FormItem
            label="文章内容"
            {...formItemLayout}
          >
            {
              getFieldDecorator('content', {
                initialValue: this.state.content
              })(
                <div className="editor" ref={this.editorRef}></div>
              )
            }
          </FormItem>
          <FormItem
            wrapperCol={{
              offset: 4
            }}
          >
            <Button type="primary" onClick={this.handleSubmit}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
