const { program } = require('commander');
const api = require('./index.js')

program
    .option('-x, --xxx', 'this xxx')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
      const words = args[1].args.join(' ');
      console.log(words);
      api.add(words)
    });
program
    .command('clear')
    .description('clear all task')
    .action((x) => {
      console.log(x);
    });

program.parse(process.argv);
