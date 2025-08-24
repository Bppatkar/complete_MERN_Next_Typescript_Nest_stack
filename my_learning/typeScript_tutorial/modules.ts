// what is module
//? Self-contained unit of code that encapsulates related  functionalities, such as classes, function, values

// 📁 modules/
// ├── 📄 math.ts
// ├── 📄 user.ts
// ├── 📄 main.ts

//! math.ts
// Exporting functions
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// Exporting a constant
export const PI = 3.14;

//! user.ts
// Exporting a class
export class User {
  constructor(public name: string, public age: number) {}

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

//! main.ts
// Importing from modules
import { add, multiply, PI } from './math';
import { User } from './user';

// Using imported functions
console.log(add(5, 3)); // 8
console.log(multiply(2, 4)); // 8
console.log(PI); // 3.14

// Using imported class
const john = new User('John', 25);
console.log(john.greet()); // "Hello, I'm John"
