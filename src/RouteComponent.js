import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { connect } from 'react-redux'

import App from './App'
import { NotFound, Login } from './pages'
import { checkTokenAction } from './actions/user'

@connect(state => ({
  hasLogin: state.user.hasLogin
}), { checkTokenAction })
export default class RouteComponent extends Component {
  componentDidMount() {
    this.props.checkTokenAction()
  }
  render() {
    console.log(this.props.hasLogin)
    return (
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={(appProps) => {
              if(this.props.hasLogin === true) {
                return <App {...appProps} />
              } else {
                return <Redirect to="/login" />
              }
            }}
          />
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/404"
            component={NotFound}
          />
          <Redirect to="/admin" from="/" exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    )
  }
}
