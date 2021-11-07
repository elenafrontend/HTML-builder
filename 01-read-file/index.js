const fs = require('fs');
const path = require('path');
const { stdout } = process;

const file = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(file, 'utf8');
let content = '';

stream.on('data', chunk => content += chunk);
stream.on('error', err => console.log('Error', err.message));
stream.on('end', () => stdout.write(content));