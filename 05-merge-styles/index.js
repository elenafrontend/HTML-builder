const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'styles');
const distFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(distFile, '', err => {
  if(err) console.log('Error', err.message);

  fs.readdir(srcFolder, (err, data) => {
    if(err) console.log('Error', err.message); 
  
    data.forEach(file => {
      const filePath = path.join(srcFolder, file);
  
      fs.stat(filePath, (err, stats) => {
        if(err) console.log('Error', err.message);
        
        const extention = path.extname(file);
        if(!stats.isDirectory() && extention === '.css') {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) console.log('Error', err.message);

            fs.appendFile(distFile, data, err => {
              if(err) console.log('Error', err.message);
            });
          });
        }
      });
    });
  });
});

