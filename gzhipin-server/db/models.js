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

const UserModel = mongoose.model('user', userSchema)
// 向外暴露Model
exports.UserModel = UserModel