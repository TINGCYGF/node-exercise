const { Readable } = require('stream');

const inStream = new Readable();

inStream.push('ABCDEFG');
inStream.push('1234567')

inStream.push(null)

//监听data事件才会流出数据
inStream.on('data', (chunk) => {
  process.stdout.write(chunk)
})