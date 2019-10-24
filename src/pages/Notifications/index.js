import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  List,
  Avatar,
  Badge,
  Button
} from 'antd'
import { connect } from 'react-redux'

import { markALlNotificationsAsRead } from '../../actions/notification'

@connect(state => {
  return {
    notifications: state.notifications.data
  }
}, { markALlNotificationsAsRead })
export default class Notifications extends Component {
  render() {
    return (
      <Card
        title="通知中心"
        style={{ margin: 16 }}
        extra={<Button onClick={this.props.markALlNotificationsAsRead}>全部标记为已读</Button>}
      >
        <List
          itemLayout="horizontal"
          dataSource={this.props.notifications}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge dot={item.isRead === false}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>}
                title={<Link to={`/admin/notifications/details/${item.id}`}>{item.title}</Link>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </Card>
    )
  }
}
