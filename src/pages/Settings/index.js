import React, { Component } from 'react'
import { connect } from 'react-redux'
// import store from '../../store'
import { changeUserName, changeUserNameAsync } from '../../actions/user'

@connect(null, { changeUserName, changeUserNameAsync })
export default class Settings extends Component {
  changeName = () => {
    // store.dispatch(changeUserName())
    this.props.changeUserNameAsync()
  }
  render() {
    return (
      <div>
        <button onClick={this.changeName}>改名</button>
      </div>
    )
  }
}
