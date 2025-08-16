import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

// console.log('Directory Name:', __dirname);
// output - Directory Name: d:\hitesh_web_dev_paid\my_learning\NodeJsInDepth\part-1\7. callbacks

function person(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();
}

function address() {
  console.log('India');
}

person('Bhanu Pratap', address);

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file', err);
    return;
  }
  console.log(data);
});
