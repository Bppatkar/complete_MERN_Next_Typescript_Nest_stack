const EmitUse = require("./proto.js");

const emtr = new EmitUse();

// console.log(emtr);

emtr.on("bhanu", () => {
  console.log("my name is bhanu");
});
emtr.on("pratap", () => {
  console.log("welcome to nikunj");
});

// for printing we make emit function in proto.js file

emtr.emit("pratap");
emtr.emit("bhanu");
