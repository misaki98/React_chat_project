// 包含n个action creator 包括异步和同步
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RESEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-types'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api'
import io from 'socket.io-client'

/**
 * 使用单例对象来保证多次调用函数返回的都是同一个IO实例
 * 1. 创建对象之前：判断对象是否已经存在，没有才去创建
 * 2. 创建对象之后：保存对象
 */
// 把链接IO封装成一个函数
function initIO(dispatch, userid) {
    if (!io.socket) {
        //连 接 服 务 器 ,得 到 代 表 连 接 的 socket对 象
        io.socket = io('ws://localhost:4000')
        //绑 定 'receiveMessage' 的 监 听 ,来 接 收 服 务 器 发 送 的 消 息 
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端端接收到消息:', chatMsg)
            // 只有当chatMsg是与当前用户相关的时候才显示消息（分发同步action）
            if(chatMsg.from === userid || userid === chatMsg.to){
                dispatch(receiveMsg(chatMsg))
            }
        })

    }
}
/**
 * 将获取聊天消息列表封装为一个函数
 * 在每次登陆成功后都需要发请求
 */
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code === 0) {
        const { users, chatMsg } = result.data
        // 分发同步action
        dispatch(receiveMsgList({ users, chatMsg }))
    }
}

// 授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示信息的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步的action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
// 接收用户列表的同步action
const receiveUserList = (userlist) => ({ type: RESEIVE_USER_LIST, data: userlist })
// 接收消息列表的同步action
const receiveMsgList = ({ users, chatMsg }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsg } })
// 接收一个消息的同步action
const receiveMsg = (chatMsg) => ({type:RECEIVE_MSG, data: chatMsg})


// 注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user
    // 这里在做表单的前台验证，如果不通过，分发一个error的同步action
    if (!username) {
        return errorMsg('用户名必须指定')
    } else if (password !== password2) {
        return errorMsg('两次密码需要一致')
    }
    // 到这里说明表单输入数据是合法的，返回一个发ajax请求的ajax函数
    return async dispatch => {
        // if(password !== password2){
        //     dispatch()
        // }

        // 在这里发注册的异步ajax请求
        const response = await reqRegister({ username, password, type })
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            // 分发成功的action
            dispatch(authSuccess(result.data))
        } else {
            // 失败分发的action为了显示错误信息
            dispatch(errorMsg(result.msg))
        }
    }
}

// 登录异步action
export const login = (user) => {
    const { username, password } = user
    // 这里在做表单的前台验证，如果不通过，分发一个error的同步action
    if (!username) {
        return errorMsg('请输入用户名')
    } else if (!password) {
        return errorMsg('请输入密码')
    }
    return async dispatch => {
        // 在这里发注册的异步ajax请求
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            // 分发成功的action
            dispatch(authSuccess(result.data))
        } else {
            // 失败分发的action为了显示错误信息
            dispatch(errorMsg(result.msg))
        }
    }
}

// 更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            // 更新成功：data
            dispatch(receiveUser(result.data))
        } else {
            // 更新失败：msg
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户信息的异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            // 成功获取数据
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

// 发送消息得分异步action
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('客户端向服务器发送消息', { from, to, content })
        io.socket.emit('sendMsg', { from, to, content })
    }
}