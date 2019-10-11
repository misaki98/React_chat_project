var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const { UserModel, ChatModel } = require('../db/models')

const filter = { password: 0, __v: 0 } //指定过滤的属性

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// // 注册一个用于用户注册的路由
// router.post('/register', function(req, res){
//   // 1. 获取请求参数
//   const {username, password} = req.body
//   // 2. 处理数据，编写后台逻辑
//   if(username === 'admin'){
//     // 注册失败,返回响应数据
//     res.send({
//       code: 1,
//       msg:'此用户已存在'
//     })
//   } else {
//     res.send({
//       code: 0,
//       data: {
//         id: 'abc123',
//         username,
//         password
//       }
//     })
//   }
// })

// 注册的路由
router.post('/register', function (req, res) {
  const { username, password, type } = req.body
  //  判断用户是否已经存在，根据username
  UserModel.findOne({ username }, function (err, user) {
    if (user) {
      // 如果存在，返回错误信息
      res.send({ code: 1, msg: '此用户已存在' })
    } else {
      // 如果不存在，保存并返回包含user的json数据
      new UserModel({ username, type, password: md5(password) }).save(function (err, user) {
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 }) //持久化cookie，保存在本地
        res.send({ code: 0, data: { username, type, _id: user._id } })
      })
    }
  })
})

// 登录的路由
router.post('/login', function (req, res) {
  const { username, password } = req.body
  // 根据用户名和密码查询users集合
  UserModel.findOne({ username, password: md5(password) }, filter, function (err, user) {
    if (user) {
      // 登录成功 1. 返回并保存cookie
      res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 }) //持久化cookie，保存在本地
      res.send({ code: 0, data: user })
    } else {
      res.send({ code: 1, msg: '用户名或密码不正确' })
    }
  })
})

// 更新用户信息的路由
router.post('/update', function (req, res) {
  // 先从请求的cookie中取到userid
  const userid = req.cookies.userid
  if (!userid) {
    // 如果没有收到userid，直接结束
    return res.send({
      code: 1,
      msg: '请先登录'
    })
  }
  // 需要得到提交的用户数据,cookie在发请求的时候会自动携带过来
  const user = req.body
  UserModel.findByIdAndUpdate({ _id: userid }, user, function (err, oldUser) {

    if (!oldUser) {
      // 说明数据库不存在这个用户，通知浏览器删除这个cookie
      res.clearCookie('userid')
      return res.send({ code: 1, msg: '请先登录' })
    } else {
      const { _id, username, type } = oldUser
      const data = Object.assign(user, { _id, username, type })
      res.send({ code: 0, data })
    }
  })

})

// 获取用户信息的路由（由cookie中获取）
router.get('/user', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    // 如果没有收到userid，直接结束
    return res.send({
      code: 1,
      msg: '请先登录'
    })
  }
  UserModel.findOne({ _id: userid }, filter, function (err, user) {
    res.send({ code: 0, data: user })
  })
})

// 获取用户列表的路由（根据用户类型）
router.get('/userlist', function (req, res) {
  const { type } = req.query
  UserModel.find({ type }, filter, function (err, users) {
    res.send({
      code: 0,
      data: users
    })
  })
})

// 查询所有与该用户相关的消息列表的接口
router.get('/msglist', function (req, res) {
  const userid = req.cookies.userid
  // 查询所有user文档数组
  UserModel.find(function (err, userDoc) {
    // 用对象存储所有user信息，key为user的_id，val为name和header组成的对象
    const users = {}
    userDoc.forEach(doc => {
      users[doc._id] = { username: doc.username, header: doc.header }
    })
    /**
     * 查询userid相关的所有聊天信息
     */
    ChatModel.find({ '$or': [{ from: userid }, { to: userid }] }, filter, function (err, chatMsg) {
      res.send({
        code: 0,
        data: {
          users, //对象
          chatMsg  //数组
        }
      })
    })
  })
})

// 修改指定消息为已读的接口
router.post('/readmsg', function (req, res) {
  // 得到请求中的from和to
  const from = req.body.from
  // 只能改别人发给自己的
  const to = req.cookies.userid
  /**
   * 获取到后就去数据库更新对应数据
   * 参数1：查询条件
   * 参数2：更新指定的数据对象
   * 参数3：是否一次更新多条，默认只更新一条
   * 参数4：更新完成的回调函数
   */
  ChatModel.update({ from, to, read: false }, { read: true }, { multi: true }, function (err, doc) {
    res.send({code: 0, data: doc.nModified}) //返回更新修改的条数
  })
})

module.exports = router;
