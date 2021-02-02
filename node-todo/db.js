const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const fs = require('fs');
//node拼接路径
const p = require('path');
const dbPath = p.join(home, '.todo');//读文件路径

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      //读取文件路径
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error) {
          return reject(error)
        }
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      //写入文件
      fs.writeFile(path, string + '\n', (error) => {
        if (error) {
          return reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}
module.exports = db