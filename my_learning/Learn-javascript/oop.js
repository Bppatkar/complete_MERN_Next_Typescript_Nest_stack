// console.log("hello bhanu");

// const computer = { cpu: 12, fname: "bhanu" };
// const lenovo = { screen: "HD", __proto__: computer };

// console.log(`lenovo`, lenovo.__proto__);

// let genericCar = { tyres: 4, sunroof: true, engine: "turbo" };
// let tesla = {
//   functionality: "AI-Based",
// };

// //setPrototypeOf
// //getPrototypeOf
// Object.setPrototypeOf(tesla, genericCar);

// console.log(`tesla`, Object.getPrototypeOf(genericCar));

//! constructor function
// function Person(name, age) {
//   // name = name;
//   this.name = name;
//   this.age = age;
// }
// debugger;

// function Car(make, modal) {
//   this.modal = modal;
//   this.make = make;
// }

// console.log(Car(2017, "sedan"));

// function Tea(type) {
//   this.type = type;
//   this.describe = () => `this is a cup of ${this.type}`;
// }

// console.log(new Tea("lemon tea").describe());

//! constructor function and prototypes
// function Car(engine) {
//   this.engine = engine;
// }
// Car.prototype.turbo = function () {
//   return `${this.engine} has turbo engine`;
// };

// console.log(new Car("volkswegan").turbo());

// function hello(name) {
//   console.log(`hello ${name}`);
// }

// hello.prototype.lName = "patkar";

// console.log(hello.prototype);
// hello.prototype.sing = function () {
//   return "sa re ga ma pa da ni sa";
// };

// console.log(hello.prototype.sing);

/* function CreateUser(firstName, lastName, email, age, address) {
  console.log("constructor called");
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.age = age;
  this.address = address;
  CreateUser.prototype.about = function () {
    return `${this.firstName} is ${this.age} years old.`;
  };
  CreateUser.prototype.is18 = function () {
    return this.age >= 18;
  };
  CreateUser.prototype.sing = function () {
    return "toon na na na la la ";
  };
}

const user1 = new CreateUser(
  "bhanu",
  "patkar",
  "bhanu@gmail.com",
  26,
  "jabera"
);
const user2 = new CreateUser(
  "harsh",
  "ni pta",
  "bp@gmail.com",
  19,
  "my address"
);
console.log(user2);
console.log(user1);
for (let key in user1) {
  // console.log(key);
}
if (user1.hasOwnProperty()) {
  console.log(key);
  // ye agr property hogi to true dega ni hogi to false...
}
 */

// function Animal(species) {
//   this.species = species;
// }

// Animal.prototype.sound = function () {
//   return `${this.species} makes a sound`;
// };

// let cow = new Animal("cow");
// console.log(cow.sound());

//! inheritance [extends keyword] [we can inherit other classes method and properties]
// class Vehicle {
//   constructor(make, modal, driver) {
//     this.make = make;
//     this.modal = modal;
//     this.driver = driver;
//   }
//   start() {
//     return `${this.make} is car from ${this.modal} driving by ${this.driver}`;
//   }
// }

// class Car extends Vehicle {
//   drive() {
//     return `${this.make} : this is an inheritance example with ${this.driver}`;
//   }
// }

// let maruti = new Car("maruti", 2017, "bhanu");
// console.log(maruti.drive());
// console.log(maruti.start());

//! super keyword

/* class Vehicle {
  constructor(make, modal, driver) {
    this.make = make;
    this.modal = modal;
    this.driver = driver;
  }
  start() {
    return `${this.make} is car from ${this.modal} driving by ${this.driver}`;
  }
}

class Car extends Vehicle {
  constructor(make, modal, driver, speed) {
    super(make, modal, driver);
    this.speed = speed;
  }
  drive() {
    return `${this.make} : this is an inheritance example with ${this.driver} and speed is ${this.speed}kmph.`;
  }
}

let maruti = new Car("maruti", 2017, "bhanu", 40);
console.log(maruti.drive());
console.log(maruti.start());
 */

//! Encapsulation [when we don't want to show some private properties it can only access by methods]
/* class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (this.amount > this.#balance) {
      return "insufficient balance";
    }
    this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return `${this.#balance} Rupees`;
  }
}

let user1 = new BankAccount();
// console.log(user1.#balance);

user1.getBalance();
console.log(user1.deposit(100));
user1.withdraw(30);
console.log(user1.getBalance());
 */

//! Abstraction  [when we don't want to show how things work behind the scene]
/* class CoffeMachine {
  start() {
    return "Machine is starting";
  }

  bruteCoffe() {
    return "Brute coffe";
  }
  pressStartButton() {
    let msg1 = this.start();
    let msg2 = this.bruteCoffe();
    return `${msg1} + ${msg2}`;
  }
}
let tea = new CoffeMachine();
console.log(tea.pressStartButton());
 */

//! polymorphism  [both class have same method name but the behavior of method is different]
/* class Bird {
  fly() {
    return `Flying...`;
  }
}

class Penguin extends Bird {
  fly() {
    return `Penguins can't fly`;
  }
}

let chidiya = new Bird();
let makkhi = new Penguin();

console.log(chidiya.fly());
console.log(makkhi.fly()); */

//! static keyword [static is a special keyword that will only called by class itself nobody else can call it]
// class Calculator {
//   static add(a, b) {
//     return a + b;
//   }
// }
// let miniCalc = new Calculator(2, 3);
// console.log(miniCalc.add(2, 3));  //miniCalc.add is not a function

// console.log(Calculator.add(2, 3));

//! getter and setter

/* class User {
  constructor(naam, umar) {
    this.naam = naam;
    this.umar = umar;
  }
  get name() {
    return this.naam;
  }
  get age() {
    return this.umar;
  }
  set name(value) {
    this.naam = value;
  }
  set age(value) {
    this.umar = value;
  }
}

let user1 = new User("bhanu", 22);
console.log(user1);
console.log(user1.name);
console.log(user1.age);
 */
