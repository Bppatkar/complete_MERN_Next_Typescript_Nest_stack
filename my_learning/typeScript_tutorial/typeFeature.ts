// what is type
//? define custom data type for object, function etc

// define type

type dataType = { userName: string; age: number };

let data1: dataType = {
  userName: 'bhanu',
  age: 25,
};
let data2: dataType = {
  userName: 'anurag',
  age: 23,
};

interface a {
  userName: string;
}
interface b {
  age: number;
}
type a1 = {
  userName: string;
};
type b1 = {
  age: number;
};

//! u can do
type c = a1 | b1;
//! but can not
// interface c = a | b  // that will show error [because never work with interface]

// how to use type
// difference between interface and type
//? we can use union with type but not with interface
//? when u want to add two interface's then u can use extends but in type u have to use insertion

