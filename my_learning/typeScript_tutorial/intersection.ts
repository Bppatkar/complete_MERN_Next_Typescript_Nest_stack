// what is intersection types
//? intersection types allow you to combine multiple types into one

// how to use it with type
// type personTA = { name: string };
// type personTB = { age: number };
// type personTC = personTA & personTB;

let personDataA: personTA = {
  name: 'Bhanu',
};
let personDataB: personTB = {
  age: 20,
};

let personDataC: personTC = {
  name: 'Bhanu',
  age: 23,
};

// how to use it with interface
interface personTA  { name: string };
interface personTB  { age: number };
type personTC  = personTA & personTB;
// interview - intersection vs union
//? in intersection we combine two dataypes and
//? in union , we choose datatypes from two datatypes
