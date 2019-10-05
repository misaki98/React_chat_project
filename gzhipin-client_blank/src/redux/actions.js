// 包含n个action creator 包括异步和同步
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RESEIVE_USER_LIST
} from './action-types'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList
} from '../api'

// 授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示信息的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步的action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
// 接收用户列表的同步action
export const receiveUserList = (userlist) => ({ type: RESEIVE_USER_LIST, data: userlist})

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
        if(result.code === 0){
            // 成功获取数据
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}