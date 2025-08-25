// keyOf
//? the keyOf keyword in typescript is used to get the key of a type as a union of string
//? it is primarily used for type safety when working with objects

type PersonT = {
  name: string;
  age: number;
  isEmp: boolean;
};

let personData: PersonT = {
  name: 'Anil Sindhu',
  age: 22,
  isEmp: true,
};

type PersonX = keyof PersonT;
let personDataX: PersonX;

// personDataX= "Bhanu";  // getting error
personDataX = 'name';
personDataX = 'age';
personDataX = 'isEmp';

//! interview - how to use  object keys with keyof
let UserX: keyof typeof personData = 'name';
