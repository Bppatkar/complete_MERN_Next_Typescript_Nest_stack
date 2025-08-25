//! it will help in big project so it is imp
// An Index Signature in typescript allows you to define objects with """dynamic keys""" while specifying the type of their values.

type userDataTypeCheck = {
  mobile: number;
  id: number;
  marks: number;
  age: number;
  semester: number;
};

let userData1: userDataTypeCheck = {
  mobile: 99,
  id: 10,
  marks: 90,
  age: 20,
  semester: 3,
  // if we have to increase key here then we have to put in userDataTypeCheck and define type means key is dynamic so how to handle
};

type userDataTypeCheck1 = {
  [key: string]: number | string | boolean;
};
let userData11: userDataTypeCheck = {
  mobile: 99,
  id: 10,
  marks: 90,
  age: 20,
  semester: 3,
  // now we can put any key string,number, boolean -  1, 2, 5, 100 , however u want
};

//! flexible object shapes
//? means i.e. - we know 3 keys will come in api , rest  i dont know

type userDataTypeCheck12 = {
  keywillCome1: string;
  keywillCome2: number;
  keywillCome3: boolean;

  [key: string]: number | string | boolean;
};
let userData112: userDataTypeCheck12 = {
  keywillCome1: 'bhanu',
  keywillCome2: 2,
  keywillCome3: true, // make it comment and see error
  mobile: 99,
  id: 10,
  marks: 90,
  age: 20,
  semester: 3,
};
