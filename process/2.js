const child_process = require('child_process')
const { execFile } = child_process

const userInput = ".";

execFile("ls", ["-la", userInput], {
  cwd: 'C:\\',
  env: {NODE_ENV: 'development'},
  maxBuffer: 1024*1024
}, (error, stdout) => {
  console.log(error);
  console.log(stdout);
});
