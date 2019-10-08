// 入口js
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'


import store from './redux/store'
// 将三个路由组件映射成路由
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'

// 引入全局样式
import './assets/css/index.less'

//import './test/socketio_test'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'))