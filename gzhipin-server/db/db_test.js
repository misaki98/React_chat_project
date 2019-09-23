// 测试使用mongoose操作mongodb数据库
// 引入md5加密
const md5 = require('blueimp-md5')
// 1. 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gzhipin_test') //最后为数据库名字
// 获取连接对象,监听这个对象
const conn = mongoose.connection
conn.on('connected', function(){
    console.log('数据库连接成功！！')
})

// 2. 得到对应特定集合的Model，用来操作集合数据
// mongodb中，文档是对象；集合是数组（多个文档的数组）
// 定义文档的结构
const userSchema = mongoose.Schema({  //对象内部指定文档的结构: 属性名/属性值的类型/是否是必须的/默认值是多少
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String}
})
// 定义model
const UserModel = mongoose.model('user', userSchema) //集合名：users  返回了一个构造函数

// 3. 通过Model或其实例进行CRUD操作 
// save()添加数据 
function testSave(){
    // 创建userModel实例
    const userModel = new UserModel({
        username: 'Bob',
        password: md5('234'),
        type: 'laoban'
    })
    // 调用save()保存
    userModel.save(function(error, userDoc){
        console.log('save()',error,userDoc)
    })
}
// testSave()
// find()/findOne()查询多个或以个数据
function testFind(){
    UserModel.find(function(error, users){
        // 查询多个:得到的是包含所有匹配文档对象的数组，如果没有匹配就是空数组[]
        console.log('find',error, users)
    })
    UserModel.findOne({username:'Tom'}, function(error, user){
        // 查询一个，得到的是匹配的一个文档对象，如果吗匹配就是null
        console.log('findOne()',error, user)
    })
}
// testFind()
// 通过findByIdAndUpdate()来更新某个数据
function testUpdate(){
    UserModel.findByIdAndUpdate({_id:'5d88cd1d5a1b2d4a8496546c'},{username:'Jack'}, function(error, doc){
        console.log('findByIdAndUpdate()', error, doc)
    })
}
// testUpdate()
// 通过remove()删除匹配的数据
function testRemove(){
    UserModel.remove({_id:'5d88cd1d5a1b2d4a8496546c'}, function(error, doc){
        console.log('remove()', error, doc)
    })
}
// testRemove()