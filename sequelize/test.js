const { Sequelize, Model, DataTypes } = require('sequelize');
const userName = 'TING';         //登录名
const password = '1127163161';   //密码
const hostName = '127.0.0.1';    //IP
const sampleDbName = 'TING2';    //数据库名

const sequelize = new Sequelize(sampleDbName, userName, password, {
  host: hostName,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
    },
  },
});

//创建 User 模型
class User extends Model {}
//初始化 User
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

//同步到数据库
(async () => {
  await sequelize.sync();
  //创建一条记录
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  //打印结果
  console.log(jane.toJSON());
})();