import path from 'path';
import { fileURLToPath } from 'url';

import wrapperExplorer from './wrapper-explorer.js';

console.log('in wrapper-demo.js file');

// console.log('filename in wrapper demo', __filename);
// console.log('dirname in wrapper demo', __dirname);
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 


wrapperExplorer.greet('Bhanu Pratap');
