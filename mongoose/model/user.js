const mongoose = require('./db')

//定义schema操作users表（集合）
let UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: {
    type: Number,
    default: 1
  },
  redirect: {
    type: String,
    set(parmas){
      if(!parmas){
        return ''
      }else if(parmas.indexOf('http://') !== 0 && parmas.indexOf('http://') !== 0){
        return 'http://' + parmas;
      }else {
        return parmas;
      }
    }
  }
})

//定义数据库模型
//注意： 1.首字母大写 2.要和数据库表对应
let User = mongoose.model('User', UserSchema, 'user')

module.exports = User;
