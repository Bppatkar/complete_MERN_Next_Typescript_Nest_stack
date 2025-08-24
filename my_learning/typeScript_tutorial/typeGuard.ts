// Typeguard in typescript
//? A TypeGuard in Typescript is a technique used to narrow down the type of a variable within a conditional block
//! simple words - to check actual datatype of variable

//* 3 types of typeguard

// 1. typeof
// 2. instanceof
// 3. Custom Type

//! Why we use TypeGuards?
// Provides better type safety
// Apply conditions with data type
// Helps TypeScript infer types automatically

let useData2: string | boolean | number = 'Bhanu Pratap';
useData2 = true;

if (typeof useData2 === 'boolean') {
  console.log('It is a bool Data Type');
} else if (typeof useData2 === 'string') {
  console.log('It is a string Data Type');
} else {
  console.log('It is a number Data Type');
}

function checkDataTye(data: string | number): void {
  if (typeof data === 'string') {
    console.log('It is a string Data Type');
    // data;  // hover on data here
  } else {
    // data; // hover on data here
    console.log('It is a number Data Type');
  }
}
checkDataTye(22);
// ________________
class Order1 {}
let o1 = new Order1();

class Product1 {}
let p1 = new Product1();

function checkDetails(data: Order1 | Product1) {
  if (data instanceof Order1) {
    console.log('This is a order data');
    // data // hover on data here
  } else {
    console.log('This is a product data');
    // data // hover on data here
  }
}

checkDetails(p1);
// ________________
interface userData {
  name: string;
  city: string;
}
interface userInfo {
  id: number | string;
  email: string;
}

let userCheck1: userInfo | userData;
let userCheck2: userInfo | userData;
userCheck1 = {
  name: 'bhanu pratap',
  city: 'mp',
};
userCheck2 = {
  id: '322re',
  email: 'mp@ok.com',
};

function checkUserInfo(data: userInfo | userData) {}

checkUserInfo(userCheck1); //hover
checkUserInfo(userCheck2); // hover
