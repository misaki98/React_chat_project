// 引入客户端io
import io from 'socket.io-client'

//连 接 服 务 器 ,得 到 代 表 连 接 的 socket对 象
const socket = io('ws://localhost:4000')

//绑 定 'receiveMessage' 的 监 听 ,来 接 收 服 务 器 发 送 的 消 息 
socket.on('receiveMsg', function (data) { console.log('浏览器端接收到消息:', data) })

//向 服 务 器 发 送 消 息 
socket.emit('sendMsg', { name: 'Tom', date: Date.now() })
console.log('浏览器端向服务器发送消息:', { name: 'Tom', date: Date.now() })
