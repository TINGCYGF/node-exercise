import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";
import {publicDecrypt} from "crypto";

const server = http.createServer();
//拼接项目路径，__dirname为目录地址
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  //url重命名为path
  const {method, url, headers} = request;
  const path = request.headers.referer
  console.log('path:' + path)
  const myURL = new URL('http://localhost:8888/index.html');
  console.log(myURL.pathname);
  console.log(myURL.search);


  switch (myURL.search) {
    case '/index.html':
      fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case '/style.css':
      response.setHeader('Content-type', 'text/css; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case '/main.js':
      response.setHeader('Content-type', 'text/css; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
  }
});

server.listen(8888);
