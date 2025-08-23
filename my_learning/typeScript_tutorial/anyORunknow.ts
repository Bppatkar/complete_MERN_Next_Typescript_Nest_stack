// what is any data type
//? which allow a variable to hold values of any types.
//? if you are not sure about datatype of variable you can use any
//? when migrating javascript code to typescript
//? when dealing with dynamic values from API'S.
//? when working with third-party libraries that lack type defination.

let value: any = 'bhanu';
value = 23;
value = true;
value = ['bhanu, 23'];
value = {};

//* when u r not sure that which type of data will come then use 'any' because behind the scene it disable to typechecker so, use it carefully

// what is unknown data type
//? the unknown type in typescript is similar to any, but
//? it's safer because it forces type checking before
//? performing operations on the value

let value1: unknown = 'bhanu';
value1 = 23;
value1 = true;
value1 = ['bhanu, 23'];
value1 = {};
value1 = 'Bhanu Pratap';

// so when we using that value of value1 varible so, on that time we have to check that that variable holding the string or not,
// let assume we are making lowercase or uppercase to that string so we check it is a string or not , before making it lower or uppercase

if (typeof value1 === 'string') {
  console.log(value1.toUpperCase());
}
