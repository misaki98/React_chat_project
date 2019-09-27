var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel} = require('../db/models')

const filter = {password: 0, __v: 0} //指定过滤的属性

/* GET home page. */
router.get('/', function(req, res, next) {
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
router.post('/register', function(req, res){
  const {username, password, type} = req.body
  //  判断用户是否已经存在，根据username
  UserModel.findOne({username}, function(err, user){
    if(user){
      // 如果存在，返回错误信息
      res.send({code: 1, msg: '此用户已存在'})
    } else {
      // 如果不存在，保存并返回包含user的json数据
      new UserModel({username, type, password:md5(password)}).save(function(err, user){
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) //持久化cookie，保存在本地
        res.send({code: 0, data:{username, type, _id: user._id}})
      })
    }
  })
})

// 登录的路由
router.post('/login', function(req, res) {
  const {username, password} = req.body
  // 根据用户名和密码查询users集合
  UserModel.findOne({username, password:md5(password)}, filter, function(err, user){
    if(user) {
      // 登录成功 1. 返回并保存cookie
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) //持久化cookie，保存在本地
      res.send({code: 0, data:user})
    } else {
      res.send({code: 1, msg: '用户名或密码不正确'})
    }
  })
})

module.exports = router;
