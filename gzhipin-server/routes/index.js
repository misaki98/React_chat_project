var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册一个用于用户注册的路由
router.post('/register', function(req, res){
  // 1. 获取请求参数
  const {username, password} = req.body
  // 2. 处理数据，编写后台逻辑
  if(username === 'admin'){
    // 注册失败,返回响应数据
    res.send({
      code: 1,
      msg:'此用户已存在'
    })
  } else {
    res.send({
      code: 0,
      data: {
        id: 'abc123',
        username,
        password
      }
    })
  }
})

module.exports = router;
