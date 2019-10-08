/**
 * 包含n个接口请求函数的模块
 * 返回的都是 promise
 */
import ajax from './ajax'


// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登录接口
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')
// 更新用户信息接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// 获取用户信息接口
export const reqUser = () => ajax('/user')

// 获取用户列表
export const reqUserList = (type) => ajax('/userlist', {type})
// 获取聊天信息
export const reqChatMsgList = () => ajax('/msglist')
// 设定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')