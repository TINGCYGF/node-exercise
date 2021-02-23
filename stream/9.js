const fs = require("fs");
//压缩模块
const zlib = require("zlib");
//用户传的路径
const file = process.argv[2];
//加密模块
const crypto = require("crypto");


const { Transform } = require("stream");

//创建变化流
const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    //每次获取数据就打印"."
    process.stdout.write(".");
    //将数据原封不动传给callback
    callback(null, chunk);
  }
});

//读文件流
fs.createReadStream(file)
  //先加密再压缩
  .pipe(crypto.createCipher("aes192", "123456"))
  //流给zlib压缩
  .pipe(zlib.createGzip())
  //流入变化流，监听变化数据
  .pipe(reportProgress)
  //流给可写文件，输出.gz文件
  .pipe(fs.createWriteStream(file + ".gz"))
  //完成事件，打印done
  .on("finish", () => console.log("Done"));
