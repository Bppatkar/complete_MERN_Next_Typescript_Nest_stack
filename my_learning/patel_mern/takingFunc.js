<<<<<<< HEAD
// const EmitUse = require("./proto.js"); // this is my custom event
// i comment all the code inside proto but it is working because we import events from node module
const event = require("./config.js");
const EmitUse = require("events"); // actual node module event
=======
const EmitUse = require("./proto.js");
>>>>>>> c64d8e95621f6198d72bdfd7f762d247fa37ccb9

const emtr = new EmitUse();

// console.log(emtr);

<<<<<<< HEAD
emtr.on(event.FULLNAME, () => {
  console.log("my name is bhanu");
});
emtr.on(event.LOCATION, () => {
  console.log("welcome to nikunj");
});
emtr.on(event.GREET, () => {
  console.log("welcome to vrindavan");
});

// for printing we make emit function in proto.js file

emtr.emit(event.FULLNAME);
emtr.emit(event.LOCATION);
emtr.emit(event.GREET);
=======
emtr.on("bhanu", () => {
  console.log("my name is bhanu");
});
emtr.on("pratap", () => {
  console.log("welcome to nikunj");
});

// for printing we make emit function in proto.js file

emtr.emit("pratap");
emtr.emit("bhanu");
>>>>>>> c64d8e95621f6198d72bdfd7f762d247fa37ccb9
