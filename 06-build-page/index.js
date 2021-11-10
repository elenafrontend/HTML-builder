const fs = require('fs');
const path = require('path');
// const { copyDir } = require('./../04-copy-directory/index.js');


const projectDist = path.join(__dirname, 'project-dist');
const components= path.join(__dirname, 'components');
const templatePath= path.join(__dirname, 'template.html');
const assets = path.join(__dirname, 'assets');
const assetsDist = path.join(projectDist, 'assets');

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

fs.access(assetsDist, err => {
  if(err) {
    copyDir(assets, assetsDist);
  } else {
    fs.rm(assetsDist, { recursive: true }, (err) => {
      if(err) console.log('Directory didn\'t delete', err.message);
      copyDir(assets, assetsDist);
    });
  }
});

// fs.mkdir(projectDist, { recursive: true }, err => {
//   if(err) console.log('Error', err.message);

  
// });

//   fs.readFile(templatePath, 'utf8', (err, data) => {
//     if(err) console.log('Error', err.message);

//     const templateData = data.split(' ');
//     console.log(templateData);

//     fs.readdir(components, (err, data) => {
//       if(err) console.log('Error', err.message);

//       data.forEach(component => {
//         const componentPath = path.join(components, component);
//         const componentName = path.parse(component).name;

//         fs.readFile(componentPath, 'utf-8', (err, componentData) => {
//           if(err) console.log('Error', err.message);

//           templateData.
          
//         });
//       });
//     });
//   });



