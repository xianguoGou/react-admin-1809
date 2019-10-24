# redux

状态容器



## 接口

- Redux.createStore: 用于创建store

- Redux.combineReducers: 用于合并reducers

- Redux.applyMiddleware: 用于应用中间件



## react-redux接口

- Provider: 有一个prop是store, 是一个react组件 
- connect: 是一个方法，方法的返回值又是一个高阶组件, 第一个参数是mapStateToProps, 第二个参数可以写成mapDispatchToProps, 也可以直接使用actionCreators({action1: action1, action2: action2})

## 在react里使用redux的步骤

1. 安装相关依赖

   ```bash
   $ npm install redux react-redux redux-thunk(或者redux-saga, 用于异步action处理) -S
   ```

2. 创建目录：src/actions  src/reducers  src/store.js

3. 创建reducers  

   1. reducers/index.js:  在这个文件里全并reducers并导出rootReducer
   2. reducers/your-reducer.js: 在这里定义初始化的状态
   3. ……

4. 在src/store.js里引入rootReducer, 做为createStore的参数，并导出整个store, 如果需要使用中间件，如异步action, 就要把applyMiddleware(你的异步中间件)做为第二个参数传入到createStore这个方法里

5. 在react的入口文件里引入 Provider和store, 并把这个Provider组件包整个react应用的在最顶层，把store做为Provider的prop传入

6. 在任何地方想要使用store.getState()的数据，就可以直接引入connect

   ```react
   import React, { Component } from 'react'
   import { connect } from 'react-redux'
   
   const mapStateToProps = (state) => {
     return {
       xxxx: state.xxx.xxxx,
       yyyy: state.yyy.yyyy
       ……
     }
   }
   
   @connect(mapStateToProps)
   export default YourComponent extends Component {
     lifeCircleMethond () {
       this.props.xxxx
       this.props.yyyy
     }
   }
   ```

7. 如果有action， 就会使用connect的第二个参数

   ```react
   // your-action.js
   export const ABCD = 'ABCD'
   // 同步action
   export const abcd = (params) => {
     return {
       type: ABCD,
       payload: {
         ...params
       }
     }
   }
   
   // 异步action
   export const defg = (params) => {
     return (dispatch) => {
       // 一些其它的操作
       setTimeout(()=>{
         dispatch({
           type: ABCD,
           payload: {
             ...params
           }
         })
       }, 2000)
     }
   }
   ```

   ```react
   // your component
   import React, { Component } from 'react'
   import { connect } from 'react-redux'
   
   import { abcd, defg } from '../your-action'
   
   const mapStateToProps = (state) => {
     return {
       xxxx: state.xxx.xxxx,
       yyyy: state.yyy.yyyy
       ……
     }
   }
   
   @connect(mapStateToProps, { abcd, defg })
   export default YourComponent extends Component {
     lifeCircleMethond () {
       this.props.xxxx
       this.props.yyyy
       this.props.abcd()
       this.props.defg()
     }
   }
   ```

   