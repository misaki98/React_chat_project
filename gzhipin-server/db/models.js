/*
包含n个操作数据库集合数据的Model模块
*/
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gzhipin')
mongoose.connection.on('connected', () => {
    console.log('db connect success!')
})

const userSchema = mongoose.Schema({
    username: { type: String, required: true }, //用 户 名
    password: { type: String, required: true }, //密 码
    type: { type: String, required: true }, //用 户 类 型 : dashen/laoban
    header: { type: String }, //头 像 名 称
    post: { type: String }, //职 位
    info: { type: String }, //个 人 或 职 位 简 介
    company: { type: String }, // 公 司 名 称 salary: {type: String} //
})

const UserModel = mongoose.model('user', userSchema)  //集合为users
// 向外暴露Model
exports.UserModel = UserModel

// 定义chats集合的文档结构
const chatSchema = mongoose.Schema({
    from: { type: String, required: true }, //发 送 用 户 的 id
    to: { type: String, required: true }, //接 收 用 户 的 id 
    chat_id: { type: String, required: true }, // from 和 to组 成 的 字 符 串
    content: { type: String, required: true }, //内 容
    read: { type: Boolean, default: false }, //标 识 是 否 已 读
    create_time: { type: Number } //创 建 时间，用于排序显示
})
// 定义能操作chats集合数据的Model
const ChatModel = mongoose.model('chat', chatSchema) //集合为chats
exports.ChatModel = ChatModel