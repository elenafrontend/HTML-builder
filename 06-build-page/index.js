const fs = require('fs');
const path = require('path');
// const { copyDir } = require('./../04-copy-directory/index.js');


const projectDist = path.join(__dirname, 'project-dist');
const components= path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
let templateContent = '';
const htmlDist = path.join(projectDist, 'index.html');
const assets = path.join(__dirname, 'assets');
const assetsDist = path.join(projectDist, 'assets');
const styles = path.join(__dirname, 'styles');
const bundleCss = path.join(projectDist, 'style.css');

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

const searchTags = () => templateContent.match(/{{[a-zA-Z]*}}/gi);

const buildHtml = () => {
  const tags = searchTags();
  tags.forEach(tag => {
    const tagName = tag.slice(2, -2);
    const component = path.join(components, `${tagName}.html`);
    fs.promises.readFile(component, 'utf-8').then(data => {
      templateContent = templateContent.replace(tag, data);
      fs.writeFile(htmlDist, templateContent, err => {
        if(err) console.log('Template hasn\'t been writen', err.message);
      });
    });
  });
};

const buildCss = () => {
  fs.writeFile(bundleCss, '', err => {
    if(err) console.log('Error', err.message);
  
    fs.readdir(styles, (err, data) => {
      if(err) console.log('Error', err.message); 
    
      data.forEach(file => {
        const filePath = path.join(styles, file);
    
        fs.stat(filePath, (err, stats) => {
          if(err) console.log('Error', err.message);
          
          const extention = path.extname(file);
          if(!stats.isDirectory() && extention === '.css') {
            fs.readFile(filePath, 'utf-8', (err, data) => {
              if(err) console.log('Error', err.message);
  
              fs.appendFile(bundleCss, data, err => {
                if(err) console.log('Error', err.message);
              });
            });
          }
        });
      });
    });
  });
};




fs.mkdir(projectDist, { recursive: true }, err => {
  if(err) console.log(`Directory ${projectDist} hasn't been maked`, err.message);

  const templateRead = fs.createReadStream(templatePath, 'utf-8');
  templateRead.on('data', chunk => templateContent += chunk);
  templateRead.on('end', buildHtml);

  buildCss();

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
});

