const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const secretFolderPath = path.join(__dirname, 'secret-folder');

async function getFilesInfo() {
    const files = await fsPromises.readdir(secretFolderPath, { withFileTypes: true });

    files.forEach(async (file) => {
        if (file.isFile()) {
            const filePath = path.join(secretFolderPath, file.name);
            const stats = await fsPromises.stat(filePath);

            const sizeInKb = (stats.size / 1024).toFixed(2);

            console.log(`Name: ${path.parse(filePath).name}, Extension: ${path.extname(filePath)}, Size: ${sizeInKb} kb`);
        }
    });
}

getFilesInfo();