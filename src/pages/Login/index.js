import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import { loginAction } from '../../actions/user'

import {
  Form,
  Icon,
  Input,
  Button,
  Spin
} from 'antd'

const itemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16, offset: 4 },
  },
}

const mapState = state => ({
  spinning: state.user.isLoginning,
  hasLogin: state.user.hasLogin
})
@connect(mapState, { loginAction })
@Form.create()
export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.loginAction()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.hasLogin
      ?
      <Redirect to="/admin/dashboard" />
      :
      (
      <Spin spinning={this.props.spinning}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...itemLayout}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            )}
          </Form.Item>
          <Form.Item
            {...itemLayout}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </Form.Item>
          <Form.Item
            {...itemLayout}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
          </Button>
          </Form.Item>
        </Form>
      </Spin>
    )
  }
}
