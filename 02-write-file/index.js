const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit} = require('process')
const filePath = path.join(__dirname, "text.txt");
const output = fs.createWriteStream(filePath);


stdout.write("Enter the text you want to write to the file. To exit, enter 'exit'.\n");

stdin.on("data", (data) => {
    output.write(data);
    
    const input = data.toString().trim();
    
    if (input.toLowerCase() === "exit") {
        stdout.write("Bye!\n");
        process.exit(0);
    }
});



process.on('SIGINT', () => {
    stdout.write("Bye!\n");
    process.exit(0);
});