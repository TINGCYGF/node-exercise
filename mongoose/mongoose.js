const mongoose = require('mongoose');

//账户密码需要采用下面的连接方式：
mongoose.connect('mongodb://admin:123456@localhost:27017/Ting', {useNewUrlParser: true});


//定义schema操作users表（集合）
let UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: Number
})

//定义数据库模型
//注意： 1.首字母大写 2.要和数据库表对应
let User = mongoose.model('User', UserSchema, 'user')

//实例化 Model 创建模型
const u = new User({
  name: 'Ting',
  age: 20,
  status: 1
})

u.save( (err) => {
  if(err){
    console.log(err);
    return;
  }
  console.log('succeed');
})

