import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
  Menu,
  Icon,
  Avatar,
  Badge,
  Dropdown,
  Spin
} from 'antd'
// connect是react-redux提供的方法，这个方法的返回结果是一个高阶组件
import {
  connect
} from 'react-redux'
import logo from '../../assets/logo.svg'
import './Frame.less'

import { logout as logoutAction } from '../../actions/user'
// import store from '../../store'
// 装饰器模式的写法


// connect的第一个参数是mapStateToProps, 意思是把store.getState()的结果里的某些注入到组件的props上
const mapStateToProps = (state) => {
  return {
    name: state.user.displayName,
    avatar: state.user.avatar,
    isLoadingNotifications: state.notifications.isLoading,
    notificationCount: state.notifications.data.reduce((res, item) => {
      if (item.isRead === false) {
        res += 1
      }
      return res
    }, 0)
  }
}
// connect的第二个参数是mapDispatchToProps, 意思是actionCreator
// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeName: () => {
//       dispatch({
//         type: 'CHANGE_USER_NAME'
//       })
//     }
//   }
// }
// @connect(mapStateToProps, mapDispatchToProps)

@connect(mapStateToProps, { logoutAction })
@withRouter
export default class Frame extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     name: ''
  //   }
  // }
  // getNameFromStore = () => {
  //   this.setState({
  //     name: store.getState().user.name
  //   })
  // }
  // componentDidMount() {
  //   this.getNameFromStore()
  //   store.subscribe(this.getNameFromStore)
  // }
  // topDropdownMenu = (
  //   <Menu>
  //     <Menu.Item key="3" onClick={() => this.onSpanClick()}><Icon type="logout" />退出</Menu.Item>
  //   </Menu>
  // )
  logout = ({ key }) => {
    if (key === '3') {
      this.props.logoutAction()
    }
  }
  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }
  render() {
    const {
      name,
      notificationCount,
      routes,
      children,
      avatar
    } = this.props
    const selectedArr = this.props.location.pathname.split('/')
    selectedArr.length = 3

    return (
      <div className="ra-layout">
        <div className="ra-header">
          <div className="ra-logo"><img src={logo} alt="09design" /></div>
          <Dropdown
            overlay={(
              <Menu>
                <Menu.Item key="1"><Link to="/admin/notifications"><Icon style={{ marginRight: 8 }} type="bell" />通知中心</Link></Menu.Item>
                <Menu.Item key="2"><Icon type="user" />个人中心</Menu.Item>
                <Menu.Item key="3" onClick={this.logout}><Icon type="logout" />退出</Menu.Item>
              </Menu>
            )}
            trigger={['click']}
          >
            <div style={{ cursor: 'pointer' }}>
              <Spin spinning={this.props.isLoadingNotifications} />
              <span className="ra-welcome">欢迎您！{name}</span>
              <Badge count={notificationCount}>
                  <Avatar src={avatar} />
              </Badge>
            </div>
          </Dropdown>
        </div>
        <div className="ra-main">
          <div className="ra-side">
            <Menu
              mode="inline"
              onClick={this.onMenuClick}
              defaultSelectedKeys={[routes[0].path]}
              selectedKeys={[selectedArr.join('/')]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.routes.map(route => {
                  return <Menu.Item key={route.path}><Icon type={route.iconType} />{route.title}</Menu.Item>
                })
              }
            </Menu>
          </div>
          <div className="ra-content">
            {children}
          </div>
        </div>
      </div >
    )
  }
}
