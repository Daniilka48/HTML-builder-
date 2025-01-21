const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const stylePath = path.join(__dirname, "styles");
const distPath = path.join(__dirname, "project-dist/bundle.css");
const output = fs.createWriteStream(distPath);

async function mergeStyles() {
    const files = await fsPromises.readdir(stylePath, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(stylePath, file.name);

        if (file.isFile() && path.extname(file.name) === ".css") {
            const data = await fsPromises.readFile(filePath, "utf8");
            output.write(data + "\n");
          }
        }
    }

    mergeStyles();