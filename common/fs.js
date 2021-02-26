const fs = require('fs');

fs.stat('./stream', (err, data) => {
  if(err){
    console.log(err);
    return;
  }
  data.isFile();//是文件
  data.isDirectory();//是目录
})

//创建文件
fs.mkdir('./css', (err) => {
  if(err){
    console.log(err);
    return;
  }
  console.log('创建成功');
})

