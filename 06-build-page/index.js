const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const distFolder = path.join(__dirname, 'project-dist');

const templatePath = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');

const stylesFolder = path.join(__dirname, 'styles');

const assetsFolder = path.join(__dirname, 'assets');
const distAssetsFolder = path.join(distFolder, 'assets');





async function createDistFolder() {
    await fsPromises.mkdir(distFolder, { recursive: true });
}


async function buildHTML() {
    let template = await fsPromises.readFile(templatePath, 'utf8');
    const componentFolderFiles = await fsPromises.readdir(componentsFolder);

    for (const file of componentFolderFiles) {
        const filePath = path.join(componentsFolder, file);
        const componentName = path.parse(file).name;

        if (path.extname(file) === '.html') {
            const content = await fsPromises.readFile(filePath, 'utf8');
            const tag = `{{${componentName}}}`;
      template = template.replace(tag, content);
    }
  }

  const distHTMLPath = path.join(distFolder, 'index.html');
  await fsPromises.writeFile(distHTMLPath, template);
}


async function buildStyles() {
    const styleFiles = await fsPromises.readdir(stylesFolder);
    const distStylePath = path.join(distFolder, 'style.css');
    const writeStream = fs.createWriteStream(distStylePath);

    for (const file of styleFiles) {
        const filePath = path.join(stylesFolder, file);
    
        if (path.extname(file) === '.css') {
          const content = await fsPromises.readFile(filePath, 'utf8');
          writeStream.write(content + '\n');
        }
    }
}


async function copyAssets(src, dest) {
    await fsPromises.mkdir(dest, { recursive: true });
    const items = await fsPromises.readdir(src, { withFileTypes: true });
  
    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
  
      if (item.isDirectory()) {
        await copyAssets(srcPath, destPath);
      } else {
        await fsPromises.copyFile(srcPath, destPath);
      }
    }
}


async function buildPage() {
      await createDistFolder();
      await buildHTML();
      await buildStyles();
      await copyAssets(assetsFolder, distAssetsFolder);
}


buildPage();