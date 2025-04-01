const fs = require("fs");

//define two variables
let a = 10;
let b = 10;

//Basic arithmetic operations
let sum = a + b;
let product = a * b;

//prepare data to write
let data = `Sum: ${sum}\n Product : ${product}`;

//write data to a local file
fs.writeFile("output.txt", data, (err) => {
  if (err) throw err;
  console.log("Data written to file");
});
