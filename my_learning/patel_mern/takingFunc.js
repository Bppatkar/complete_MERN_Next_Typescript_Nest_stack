// const EmitUse = require("./proto.js"); // this is my custom event
// i comment all the code inside proto but it is working because we import events from node module
const event = require("./config.js");
const EmitUse = require("events"); // actual node module event

const emtr = new EmitUse();

// console.log(emtr);

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
