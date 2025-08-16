import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFolder = path.join(__dirname, 'Data');

if (!fs.existsSync(dataFolder)) {
  fs.mkdir(dataFolder, (err) => {
    if (err) throw err;
  });
  console.log('data folder created successfully 🚀');
}

const filePath = path.join(dataFolder, 'example.txt');

// sync way of creating the file

fs.writeFileSync(filePath, 'Hellooooo From node js');
console.log('File Created Successfully 🚀');

const readContentFromFile = fs.readFileSync(filePath, 'utf-8');
console.log('File Content 📚📔📕: ', readContentFromFile);

fs.appendFileSync(filePath, '\nThis is a new line added to the file');
console.log('New file content added ');

//async way of creating the file

const asyncFilePath = path.join(dataFolder, 'async-example.txt');

fs.writeFile(asyncFilePath, 'Hello , Async Node Js ', (err) => {
  if (err) throw err;
  console.log('Async File is created Successfully 🚀');

  fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('Async file content:', data);

    fs.appendFile(
      asyncFilePath,
      '\nThis is an another line added from async code',
      (err) => {
        if (err) throw err;
        console.log('New line added to the async file 🚀');
      }
    );

    fs.readFile(asyncFilePath, 'utf-8', (err, updatedData) => {
      if (err) throw err;
      console.log('Updated File Content 🚀', updatedData);
    });
  });
});
