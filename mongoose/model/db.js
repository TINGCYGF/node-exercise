const mongoose = require('mongoose');

//账户密码需要采用下面的连接方式：
mongoose.connect('mongodb://admin:123456@127.0.0.1:27017/user', {useNewUrlParser: true})
;

module.exports=mongoose;