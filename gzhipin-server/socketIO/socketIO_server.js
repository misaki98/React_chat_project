const {ChatModel} = require('../db/models')
module.exports = function (server) {
    // 得 到 IO 对 象
    const io = require('socket.io')(server)
    // 监 视 连 接 ( 当 有 一 个 客 户 连 接 上 时 回 调 ) 
    io.on('connection', function (socket) {
        console.log('有一个客户连接上了服务器')
        // 绑 定 sendMsg 监 听 , 接 收 客 户 端 发 送 的 消 息 
        socket.on('sendMsg', function ({from, to, content}) {
            console.log('服务器接收到浏览器的消息', {from, to, content})
            // 处理数据(保存消息),先准备消息对象
            const chat_id = [from, to].sort().join('_') //from_to或者to_from,无论是什么顺序，生成的结果一定要是一致的
            const create_time = Date.now()
            new ChatModel({from, to, content, chat_id, create_time}).save(function(error, chatMsg){
                // 向所有连接的客户端发
                io.emit('receiveMsg', chatMsg)
            })

        })
    })
}