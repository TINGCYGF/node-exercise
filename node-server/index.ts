import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";

const server = http.createServer();

//拼接项目路径，__dirname为目录地址
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  //url重命名为path
  console.log(request);
  const {method, url: path, headers, rawHeaders} = request;
  console.log(path + rawHeaders[1]);
  const {pathname, search} = new URL(path, 'http://'+ rawHeaders[1])

  if(method !== 'GET') {
    response.statusCode = 200;
    response.end('这是一个假响应');
    return;
  }

  let filename = pathname.substr(1);
  if(filename === '') {
    filename = 'index.html'
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if(error) {
      if (error.errno === -4058){
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data);
        })
      }else if(error.errno === -4068) {
        response.statusCode = 403;
        response.end('无权访问目录')
      }else {
        response.statusCode = 500;
        response.end('服务器繁忙')
      }
    }else {
      response.end(data)
    }
  })
});

server.listen(8888);
