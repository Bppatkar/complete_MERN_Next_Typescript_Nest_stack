//! functions

/* function orderTea(teaTypes) {
  function confirmOrder() {
    return "Order confirmed for chai";
  }
  return confirmOrder();
}

let tea = orderTea("lemon");
console.log(tea);
 */

/* let calculateTotal = (price, quantity) => price * quantity;

let totalCost = calculateTotal(220, 5);
console.log(totalCost);
 */

/* function makeTea(typeOfTea) {
  return `making ${typeOfTea} right now!!`;
}

function processTeaOrder(teaFunction) {
  return teaFunction("Earl grey");
}

let result = processTeaOrder(makeTea);
console.log(result);
 */

/* function createTeaMaker() {
  return function (teaType) {
    return `making ${teaType}`;
  };
}

let teaMaker = createTeaMaker();
let result = teaMaker("Green Tea");
console.log(result); */

/* class Animal {
  constructor(name, age) {
    console.log("constructor called");
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating`;
  }
  isSuperCute() {
    return this.age <= 1;
  }
  isCute() {
    return true;
  }
}

const animal1 = new Animal("horse", 12);
console.log(animal1);
console.log(animal1.eat());

class Dog extends Animal {}
const dog1 = new Dog("tommy", 2);
console.log(dog1);
 */

// Creating an object to hold user details
// const user = {
//   name: "John Doe",
//   age: 30,
//   email: "john.doe@example.com",
//   isActive: true,
// };

// console.log(user);

// for (let key of user) {
//   console.log(key);
// }

/* //! microtask queue and callback queue

console.log("script start");

const bucket = ["vegetable", "rice", "salt", "spoon", "masalas", "water"];

const myFriedRice = new Promise((resolve, reject) => {
  if (
    bucket.includes("vegetable") &&
    bucket.includes("salt") &&
    bucket.includes("rice")
  )
    resolve("finally we got our fried rice");
  else reject(new Error("sorry we dont have some vegetables"));
});

myFriedRice.then(
  (friedRice) => {
    console.log(friedRice);
  },
  (err) => {
    console.error("sorry!!!");
  }
);

setTimeout(() => {
  console.log("Hello from timeout");
}, 1000);

for (let i = 0; i <= 50; i++)
  console.log(Math.floor(Math.random() * 10) + 1, i);

console.log("script end");
 */
// __________________________________
/* 
//! 🔺 Final Execution Priority (Highest to Lowest)
//* 1️⃣ Call Stack (Synchronous Code)
//* 2️⃣ Process.nextTick() (Node.js) ⬆️
//* 3️⃣ Microtask Queue (Promise, MutationObserver, queueMicrotask)
//* 4️⃣ Render Queue (UI Updates, Repaints, Reflows)
//* 5️⃣ RequestAnimationFrame (Before Paint - for smooth animations)
//* 6️⃣ Callback Queue (setTimeout, setInterval, DOM Events, I/O callbacks)
//* 7️⃣ setImmediate() (Node.js - after I/O but before setTimeout(0))

//! 🔥 Summary
//* Synchronous code (Call Stack) runs first.
//* Microtasks (Promises, MutationObserver) execute before callbacks.
//* setTimeout, setInterval go into the callback queue.
//* UI updates happen after microtasks but before callback queue.
//* Node.js: process.nextTick() executes before microtasks.
//* Node.js: setImmediate() executes before setTimeout(0).


*/

/* console.log("Start");

Promise.resolve().then(() => {
  console.log("inside Promise");
  document.body.style.background = "red"; // UI update happens
});

setTimeout(() => console.log("Timeout"), 0);
console.log("End");
 */

//! we have 3 most common way to create and send request to server
//? 1) xmlHTTPRequest (old way of doing)
//? 2) fetch API (new way of doing)
//? 3) axios (this is third party library)

// const xhr = new XMLHttpRequest();
// console.log(xhr);

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.log(new console.error("something went wrong", err)));

/* const URL = "https://jsonplaceholder.typicode.com/users";
const xhr = new XMLHttpRequest();
xhr.open("GET", URL);
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     const res = xhr.response;
//     const data = JSON.parse(res);
//     console.log(typeof data);
//   }
// };

xhr.onload = function () {
  const res = xhr.response;
  const data = JSON.parse(res);
  // console.log(typeof data);
  data.forEach((user) => {
    const { id, name, email, username } = user;
    console.log(id, name, email, username);
  });
};

xhr.send();
 */

/* fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((json) => {
    json.forEach((user) => {
      const { id, name, email, username } = user;
      console.log(id, name, email, username);
    });
  })
  .catch((err) => console.log(new console.error("something went wrong", err)));
 */

//! async await

/* async function getdata() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  data.forEach((user) => {
    const { id, name, email, username } = user;
    console.log(id, name, email, username);
  });
}

getdata();
 */
