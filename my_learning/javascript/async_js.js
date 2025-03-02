// const time = new Date().toLocaleDateString().toLocaleString();
// console.log(time);

// const id = function uniqueID() {
//   return Math.floor(Math.random() * Date.now());
// };

// const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

// const id = crypto.randomUUID();
// const id1 = crypto.randomUUID();
// const id2 = crypto.randomUUID();
// const id3 = crypto.randomUUID();
// const id4 = crypto.randomUUID();
// const id5 = crypto.randomUUID();

//! above code of random id generator
// _______________________________________

//! closure
// function outer() {
//   let name = "bhanu";
//   return function inner() {
//     console.log(`my name is ${name}`);
//   };
// }

// let data = outer();
// data();

//! promise
// function fetchData() {
//   return new Promise((resolve, reject) => {
//     console.log("wait....");
//     setTimeout(() => {
//       let success = true;
//       if (success) resolve("data fetched successfully");
//       else reject("data not fetched");
//     }, 3000);
//   });
// }
// fetchData()
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err))  ;

//! prototypal inheritance  [inheritance being done in prototype ]
// function Person(name, age) {
//   console.log("constructor called");
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.greet = function () {
//   console.log(`hello my name is: ${this.name}`);
// };

// let bhanu = new Person("bhanu", 26);
// console.log(bhanu);
// bhanu.greet();

//! This Keyword
// const person = {
//   name: "bhanu",
//   greet() {
//     console.log(`hello my name is ${this.name}`);
//   },
// };

// const user1 = Object.create(person);
// console.log(user1);
// user1.name = "bhanu";
// user1.greet();

// const user2 = Object.create(person);
// user2.name = "hitesh";
// user2.greet();

// const user1 = person;
// user1.greet.call({ name: "anurag" });
// // bind
// const boundGreet = user1.greet.bind({ name: "john" });
// boundGreet();

// const user1 = person;
// user1.greet.call({ name: "bhanu" });

// // Using call
// user1.greet.call({ name: "bhanu" });

// // Using apply
// user1.greet.apply({ name: "hitesh" });

// // Using bind
// const boundGreet = user1.greet.bind({ name: "john" });
// boundGreet();

//* call apply and bind method

/* function greeting(greet) {
  fName = "chacha";
  fName = "foofa";
  console.log(
    `hello , my name is ${this.fName} ${this.lName} thanks for ${greet}`
  );
}

let user1 = {
  fName: "bhanu",
  lName: "patkar",
};
let user2 = {
  fName: "anurag",
  lName: "patkar",
};
let user3 = {
  fName: "mummy",
  lName: "papa",
};

let calling = greeting.call(user1, "calling");
let applying = greeting.apply(user2, ["serving"]);
let binding = greeting.bind(user3, "inviting");
binding();

 */

// let detail = {
//   fullName: "Bhanu Pratap Patkar",
// };

// let printName = {
//   fullName: "Anurag Patkar",
//   callme(age) {
//     console.log(this.fullName + " " + age);
//   },
// };
// //call
// printName.callme.call(detail, 42);

// // bind
// console.log(printName.callme(32)); // undefined
// console.log(printName.callme.bind(detail)(22));

// // apply
// console.log(printName.callme.apply(detail, [12]));

//! async await and promise.all
// let URL = "https://jsonplaceholder.typicode.com/todos";

// async function fetchData(URL) {
//   try {
//     let res = await fetch(URL);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     let data = res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// fetchData(URL).then((data) =>
//   data.forEach((elem) => console.log(elem.userId, elem.title, elem.completed))
// );

//! promise.all

// function fetchPostData() {
//   return new Promise((resolve) => {
//     console.log("Post data are comming....");
//     setTimeout(() => {

//       resolve("Post data fetching successfully");
//     }, 2000);
//   });
// }

// function fetchCommentData() {
//   return new Promise((resolve) => {
//     console.log("Comment data are comming....");
//     setTimeout(() => {

//       resolve("Comment data fetching successfully");
//     }, 3000);
//   });
// }

// async function getBlogData() {
//   try {
//     let postData = await fetchPostData();
//     let commentData = await fetchCommentData();
//     let final = Promise.all([postData, commentData]);
//     return final;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// getBlogData().then((data) => console.log(data , "fetching complete"));

//! iterator and generator
// function* generator() {
//   //generator function
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let gen = generator();
// let gen1 = generator();

// console.log(gen.next().value);
// console.log(gen.next().value);
// console.log(gen.next().value);
// console.log("--------------------");
// console.log(gen.next().value);
// console.log("--------------------");

// console.log(gen1.next().value);
// console.log(gen1.next().value);
// console.log(gen1.next().value);
// console.log("--------------------");

//! Es6 Module  //[add type module in html file]
// export function add(a, b) {
//   return a + b;
// }
// export function sub(a, b) {
//   return a - b;
// }

// export default function mul(a, b) {
//   return a * b;
// }

//! other way of exporting functions

// function areaOfCircle(radius) {
//   return Math.PI * radius * radius;
// }

// function areaOfRectangle(length, width) {
//   return length * width;
// }

// function isTriangle(a, b, c) {
//   return a + b > c && a + c > b && b + c > a;
// }

// module.exports = {
//   areaOfCircle,
//   areaOfRectangle,
//   isTriangle,
// };

//! Debouncing

// function debounce(cb, delay) {
//   let timer;
//   return function (...arg) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       cb(...arg);
//     }, delay);
//   };
// }

// const log = debounce(() => console.log("bhanu"), 1000);
// log();
// log();
// log(); // only this call execute after 1 sec

/* 
 How it Works?
Every time the function is called, clearTimeout(timer) cancels the previous call.
A new setTimeout is set, ensuring the function only runs after the user stops calling it.
Useful for search bars, resizing windows, etc.
 */

//! deep cloning
