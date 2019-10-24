import React, { Component } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Frame } from './components'
import { connect } from 'react-redux'
import { getNotificationsAction } from './actions/notification'
import routes from './routes'
const navRoutes = routes.filter(route => route.isNav === true)

const mapState = state => {
  return {
    role: state.user.role
  }
}
@connect(mapState, { getNotificationsAction })
export default class App extends Component {
  componentDidMount() {
    // 实际的项目中，也有一种情况，为了避免首页请求的数据过多，会用另外一个接口，只返回用户未读消息的数量，
    // 还有一种情况是：用户在登录之后，直接把未读消息的数据，返回在登录接口里，这样还能节约一次请求
    this.props.getNotificationsAction()
  }
  render() {
    return (
      <Frame routes={navRoutes}>
        <Switch>
          {
            routes.map(route => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.isExact}
                  render={(props) => {
                    // 再复杂的权限在react里只是if的条件变了而已
                    if (route.isAuthRequired === true) {
                      return <Redirect to="/admin/noauth" />
                    }
                    // if (!route.roles.includes(this.props.role)) {
                    //   return <Redirect to="/admin/noauth" />
                    // }
                    return <route.component {...props} />
                  }}
                />
              )
            })
          }
          <Redirect to="/admin/dashboard" from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    );
  }
}
