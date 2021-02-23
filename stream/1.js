const fs = require('fs');

const stream = fs.createWriteStream('./big_file.txt')

for (let i=0; i<1000; i++){
  stream.write(`这是第${i}行，写文件\n`)
}

stream.end();
console.log('done')