const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const copyFile = fsPromises.copyFile;

async function copyDir(srcDir, destDir) {

    await fsPromises.mkdir(destDir, { recursive: true });

    const destFiles = await fsPromises.readdir(destDir);

    for (const file of destFiles) {
        const destPath = path.join(destDir, file);
        const srcPath = path.join(srcDir, file);
    
        try {
            await fsPromises.stat(srcPath);
          } catch {
            await fsPromises.unlink(destPath);
          }
    }

    const srcFiles = await fsPromises.readdir(srcDir);

    for (const file of srcFiles) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
    
        await copyFile(srcPath, destPath);
      }
}
const sourceFolder = path.join(__dirname, "files");
const destinationFolder = path.join(__dirname, "files-copy");

copyDir(sourceFolder, destinationFolder);