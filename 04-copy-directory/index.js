const fs = require('fs');
const path = require('path');

const copyFolderPath = path.join(__dirname, 'files-copy');
const sourceFolderPath = path.join(__dirname, 'files');

const copyDir = () => {
  fs.mkdir(copyFolderPath, {recursive: true}, err => {
    if(err) console.log('Directory hasn\'t been maked', err.message);

    fs.readdir(sourceFolderPath, (err, data) => {
      if(err) console.log('Error', err.message);
  
      data.forEach(file => {
        const sourceFile = path.join(__dirname, 'files', file);
        const copyFile = path.join(__dirname, 'files-copy', file);
  
        fs.copyFile(sourceFile, copyFile, err => {
          if(err) throw err;
        });
      });
    });
  });
};




fs.access(copyFolderPath, err => {
  if(err) {
    copyDir();
  } else {
    console.log('Directory exists');

    fs.rm(copyFolderPath, { recursive: true }, (err) => {
      if(err) console.log('Directory didn\'t delete', err.message);
      copyDir();
    });
  }
});