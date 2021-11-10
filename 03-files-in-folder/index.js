const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, data) => {
  if(err) console.log('Error', err.message);

  data.forEach(file => {
    const filePath = path.join(folder, file);

    fs.stat(filePath, (err, stats) => {
      if(err) console.log('Error', err.message);

      if(!stats.isDirectory()) {
        const extention = path.extname(file).slice(1);
        const fileName = path.parse(file).name;
        const size = stats.size / 1000;
        console.log(`${fileName} - ${extention} - ${size}kB`);
      }
    });
  });
});