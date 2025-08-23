// what is symbol data type
//? Every Symbol created is guaranteed to be unique, even if they have the same description
//* Symbol('hello') === Symbol('hello') evaluates to false.
// how to use it

const sym1 = Symbol();
const sym2 = Symbol('key');
const sym3 = Symbol('key');

// console.log(sym2 === sym3); // false
// example
// where we can use
//? for generating a unique id
