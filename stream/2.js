const fs = require('fs');
const http = require('http');

const server = http.createServer()
server.on('request', (request, response) => {
  const stream =
    fs.createWriteStream('./big_file.txt')
  //data事件，读取时会分段读取触发
  stream.on('data', (chunk) => {
    console.log('读取一段数据')
    console.log(chunk.toString())
  })
  //end事件，结束触发
  stream.end('end', () => {
    console.log('读取完毕')
  })
  stream.pipe(response)
})

server.listen(8888);