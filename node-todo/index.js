const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const fs = require('fs');
//node拼接路径
const p = require('path');
const dbPath = p.join(home, '.todo');//读文件路径

const db = require('./db.js')

module.exports.add = async (title) => {
  //读取之前的任务
  const list = await db.read()
  //添加一个title任务
  list.push({title: title, done: false})
  //存储任务到文件
  await db.write(list)
}


