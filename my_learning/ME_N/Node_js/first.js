// const fs = require("fs");

// //define two variables
// let a = 10;
// let b = 10;

// //Basic arithmetic operations
// let sum = a + b;
// let product = a * b;

// //prepare data to write
// let data = `Sum: ${sum}\n Product : ${product}`;

// //!write data to a local file
// fs.writeFile("output.txt", data, (err) => {
//   if (err) throw err;
//   console.log("Data written to file");
// });

// //!read data from a local file
// fs.readFile('output.txt', 'utf8', (err, data) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log(data);
// });

// //! append data to a local file (without overwriting the existing data)
// fs.appendFile('output.txt', '\nAppended Content', (err) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log('Content has been appended!');
// });

// //! delete a local file
// fs.unlink('example.txt', (err) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log('File deleted!');
// });

//? _______________________________________________________

//! REPL (Read Eval Print Loop) 
// it is a computer environment where user can write and execute code in a continuous loop.
//In Node.js, the REPL is a simple way to experiment with code and see immediate results.
//The REPL is a simple text-based interface, where user can write JavaScript code and see immediate results.
//For example, if user enters the expression 2+2, the REPL will print 4 as the result.
//REPL is also known as Node Shell or JS Shell.
//! The node command line interface, also known as the REPL (Read-Eval-Print Loop), is a simple way to experiment with code and see immediate results.
//To start the REPL, just type node at the command line. The REPL has a prompt, which is the > symbol.
//You can type any valid JavaScript expression at the prompt and press Enter to execute it.
//The result of the expression will be displayed in the console, and a new prompt will be displayed to enter another expression.
//! The REPL is a very useful tool for quickly testing a piece of code or experimenting with a new feature.

//? _______________________________________________________

//! first node server