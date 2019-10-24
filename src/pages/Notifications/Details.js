import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeNotificationReadStatus } from '../../actions/notification'
@connect(null, { changeNotificationReadStatus })
export default class Details extends Component {
  componentDidMount() {
    this.props.changeNotificationReadStatus(this.props.match.params.id)
    // 实际项目中，还得通知服务器，此用户已读此消息， 也有可能是在发请求的时候，服务器已经知道此用户已读此消息
  }
  render() {
    return (
      <div>
        通知详情页
      </div>
    )
  }
}
