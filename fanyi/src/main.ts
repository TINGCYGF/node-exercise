import * as https from "https";
import * as querystring from "querystring";
import md5 = require("md5");
import {appId, appSecret} from "./private";


export const translate = (word: string) => {
  console.log('===');
  console.log(word);

  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);
  let from, to;
  if(/[a-zA-Z]/.test(word[0])){
    //英译中
    from = 'en';
    to = 'zh';
  }else {
    //中翻译英
    from = 'zh';
    to = 'en'
  }


  const query: string = querystring.stringify({
    q: word,
    from: from,
    to: to,
    appid: appId,
    salt: salt,
    sign: sign
  })

  const options = {
    hostname: 'fanyi-api.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    let chunks: Buffer[] = [];
     res.on('data', (chunk: Buffer) => {
       console.log(chunk.constructor)
      chunks.push(chunk);
    });
    res.on('end', () => {
      const string = Buffer.concat(chunks).toString()

      type BaiduResult = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: { src: string; dst: string; }[]
      }

      const object: BaiduResult = JSON.parse(string);
      //判断错误码
      if(object.error_code) {
        if(object.error_code === '52003'){
          console.log('用户认证失败');
        } else {
          console.error(object.error_msg);
        }
        //退出
        process.exit(2);
      }else {
        console.log(object.trans_result[0].dst);
        //成功也是退出
        process.exit(0);
      }
    })
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};