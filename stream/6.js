const { Writable } = require("stream");

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});
//process.stdin是用户输入stream，流向outStream
process.stdin.pipe(outStream);

// process.stdin.on('data', (chunk) => {
//   outStream.write(chunk)
// })