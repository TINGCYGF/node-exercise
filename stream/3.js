const fs = require('fs')

const stream = fs.createReadStream('./big_file.txt')

console.log(stream)