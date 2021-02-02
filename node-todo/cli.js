#!/usr/bin/env node
const {program} = require('commander');
const api = require('./index.js')

program
  .option('-x, --xxx', 'this xxx')

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args[1].args.join(' ');
    console.log(words);
    api.add(words).then(() => console.log('添加成功'), () => console.log('添加失败'))
  });

program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear().then(() => {console.log('清除成功')}, () => {console.log('清除失败')})
  });



if (process.argv.length === 2) {
  void api.showAll()
}else {
  program.parse(program.argv)
}
