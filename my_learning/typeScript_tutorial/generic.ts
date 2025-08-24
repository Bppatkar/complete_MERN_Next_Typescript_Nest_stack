// what is generics
//? generics in typescript allow you to create reusable components that work with a variety of data types while maintaining type safety

// function fruit(name: string | number | boolean): string | number | boolean {
//   return name;
// }

//* fruit('bhanu');
// i put string but when i want number then we do | number
//* fruit(100);
// then i put number but now i want boolean then we do | boolean
//* fruit(true);

// but how long we do regularly
//? string | number | boolean
//! so we do <T> means everywhere get the same datatype and return that same datatype

function fruit<T>(name: T): T {
  return name;
}
let f1 = fruit('Bhanu'); // hover on f1 we get same datatype which we send it
let f2 = fruit(100); // hover on f2 we get same datatype which we send it
let f3 = fruit(true); // hover on f3 we get same datatype which we send it

//! means we are reusing that same function with resuing its type

//! Question - why we dont use any
// lets find out

function fruitAny(name: any): any {
  return name;
}
let fAny1 = fruitAny('Bhanu'); // hover on f1 we get any
let fAny2 = fruitAny(100); // hover on f2 we get any
let fAny3 = fruitAny(true); // hover on f3 we get any

//! we always get any that's why we dont use it but if we use <T> then it will return same  datatype which we send it

// example
function userNewCheck<T>(data: T): T {
  return data;
}

let ans1 = userNewCheck([1, 2, 3, 4]);
let ans2 = userNewCheck({ name: 'Bhanu' });
let ans3 = userNewCheck("bhanu")
let ans4 = userNewCheck(222)
let ans5 = userNewCheck(undefined)
let ans6 = userNewCheck(null)
