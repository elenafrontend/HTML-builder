const fs = require('fs');
const path = require('path');

const copyFolderPath = path.join(__dirname, 'files-copy');
const sourceFolderPath = path.join(__dirname, 'files');

const copyDir = (source, copy) => {
  fs.mkdir(copy, {recursive: true}, err => {
    if(err) console.log('Directory hasn\'t been maked', err.message);

    fs.readdir(source, (err, data) => {
      if(err) console.log('Error', err.message);
  
      data.forEach(file => {
        const sourceFile = path.join(source, file);
        const copyFile = path.join(copy, file);

        fs.stat(sourceFile, (err, stats) => {
          if(err) console.log('Error', err.message);
    
          if(stats.isDirectory()) {
            copyDir(sourceFile, copyFile);
          } else {
            fs.copyFile(sourceFile, copyFile, err => {
              if(err) console.log(`${sourceFile} hasn't been copied`, err.message);
            });
          }
        });
  
      });
    });
  });
};

fs.access(copyFolderPath, err => {
  if(err) {
    copyDir(sourceFolderPath, copyFolderPath);
  } else {
    console.log('Directory exists');

    fs.rm(copyFolderPath, { recursive: true }, (err) => {
      if(err) console.log('Directory didn\'t delete', err.message);
      copyDir(sourceFolderPath, copyFolderPath);
    });
  }
});