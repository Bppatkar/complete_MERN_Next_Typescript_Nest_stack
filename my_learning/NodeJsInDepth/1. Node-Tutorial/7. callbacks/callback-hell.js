import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log('Error in reading file', err);
    return;
  }

  const modifiedData = data.toUpperCase();
  const outputFilePath = path.join(__dirname, 'output.txt');

  fs.writeFile(outputFilePath, modifiedData, (err) => {
    if (err) {
      console.log('Error in reading file', err);
      return;
    }

    console.log('Data written to the new file');

    fs.readFile(outputFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.log('Error in reading file', err);
        return;
      }
      console.log(data);
    });
  });
});
