// 包含多个reducer函数，根据老的state和指定的action返回一个新的state
import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'

import {getRedirectTo} from '../utils'

const initUser = {
    username: '', // 用户名
    type: '',  // 类型dashen/laoban
    msg: '', //用来存错误提示信息
    redirectTo: '' // 需要自动重定向的路由路径
}
// 产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:  // data为user
            const {type, header} = action.data

            return { ...action.data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG:  //data为msg
            return { ...state, msg: action.data }
        default:
            return state
    }
}

export default combineReducers({
    user
})
// 向外暴露多个状态的结构：{user:{}}

