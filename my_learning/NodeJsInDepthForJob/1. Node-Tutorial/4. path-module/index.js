import { fileURLToPath } from 'url';
import path from 'path';



console.log('Directory Name:', __dirname);
// output - Directory Name: d:\hitesh_web_dev_paid\my_learning\NodeJsInDepth\part-1\4. path-module
console.log('File Name:', __filename);
// output - File Name: d:\hitesh_web_dev_paid\my_learning\NodeJsInDepth\part-1\4. path-module\index.js
console.log('File Extension:', path.extname(__filename));
// output - File Extension: .js

const joinPath = path.join('/user', 'documents', 'node', 'projects');
console.log('Joined path', joinPath);

const resolvePath = path.resolve('user', 'documents', 'node', 'project');
console.log('Resolve path:', resolvePath);

const normalizePath = path.normalize(
  '/user/../bhanu/documents/../node/projects'
);
console.log('normalizePath', normalizePath);

// mostly used for file path
// 1. __dirname
// 2. __filename
// 3. path.join
