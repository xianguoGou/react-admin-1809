import React from 'react'
import ReactDOM from 'react-dom'
import { LocaleProvider } from 'antd'
import { Provider } from 'react-redux'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import RouteComponent from './RouteComponent'

import './index.less'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <RouteComponent />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
