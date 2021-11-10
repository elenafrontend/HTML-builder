// const process = require('process');
const { stdin, stdout, exit } = process;
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');

function printBye() {
  stdout.write('Удачи в дальнейшем обучении!');
  exit();
}


fs.writeFile(file, '', error => {
  if(error) console.log('Error', error.message);
});

stdout.write('Введите, пожалуйста, данные для файла\n');

stdin.on('data', data => {
  const text = data.toString().trim();

  if(text === 'exit') printBye();

  fs.appendFile(file, data, error => {
    if(error) console.log('Error', error.message);
  });
});

process.on('SIGINT', printBye);