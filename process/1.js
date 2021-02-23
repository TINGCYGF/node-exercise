const util = require('util')
const child_process = require('child_process')
const {exec} = child_process

const exec2 = util.promisify(exec);

exec2('ls ../').then(data => {
  console.log(data);
})