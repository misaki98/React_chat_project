// 包含多个reducer函数，根据老的state和指定的action返回一个新的state
import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RESEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-types'

import { getRedirectTo } from '../utils'

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
            const { type, header } = action.data

            return { ...action.data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG:  //data为msg
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}

const initUserList = []
// 产生userlist状态的reducer
function userList(state = initUserList, action) {
    switch (action.type) {
        case RESEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users: {}, // 所有用户信息的对象，属性名：userid，属性值{username，header}
    chatMsg: [],  //当前用户所有相关message的数组
    unReadCount: 0 //总未读数量
}
// 产生聊天状态的reducer
function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST: //data:{users,chatMsg}
            const {users, chatMsg} = action.data
            return {
                users,
                chatMsg,
                unReadCount:0
            }
        case RECEIVE_MSG:
            const ChatMsg = action.data
            return {
                users: state.users,
                chatMsg: [...state.chatMsg, ChatMsg], //先保留原数组所有元素，在加上本次的元素
                unReadCount: 0
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})
// 向外暴露多个状态的结构：{user:{}}

