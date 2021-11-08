const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const components= path.join(__dirname, 'components');
const templatePath= path.join(__dirname, 'template.html');

fs.mkdir(projectDist, { recursive: true }, err => {
  if(err) console.log('Error', err.message);

  fs.readFile(templatePath, 'utf8', (err, data) => {
    if(err) console.log('Error', err.message);

    const templateData = data.split(' ');
    console.log(templateData);

    fs.readdir(components, (err, data) => {
      if(err) console.log('Error', err.message);

      data.forEach(component => {
        const componentPath = path.join(components, component);
        const componentName = path.parse(component).name;

        fs.readFile(componentPath, 'utf-8', (err, componentData) => {
          if(err) console.log('Error', err.message);

          templateData.
          
        });
      });
    });
  });
});

// ! Не дописала =)
