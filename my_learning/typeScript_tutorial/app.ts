//Data types
// 1. Primitive Types (Basic Building Blocks)
// These represent a single value.

// number: Represents both integer and floating-point numbers.

let age: number = 30;
let price: number = 19.99;

// string: Represents text data enclosed in single ('), double ("), or backticks (`).

let name: string = 'Alice';
let greeting: string = `Hello, ${name}!`; // Template literal

// boolean: Represents the logical values true or false.

let isActive: boolean = true;
let isCompleted: boolean = false;

// null: Intentionally contains no value. It is its own type.

let data: null = null;

// undefined: Represents a variable that has been declared but not assigned a value.

let value: undefined = undefined;
// symbol (ES6): A unique and immutable primitive value, often used as object property keys.

let key: symbol = Symbol('uniqueKey');
// bigint: Represents whole numbers larger than 2^53 - 1. Created by appending n to an integer.

let bigNumber: bigint = 9007199254740991n;

// 2. any
// A special type that opt-out of type checking. A variable of type any can be assigned any value. Its use is generally discouraged as it defeats the purpose of .

let flexibleVar: any = 'could be a string';
flexibleVar = 42; // No error
flexibleVar = true; // No error

// 3. unknown

// Similar to any but safer. You cannot perform arbitrary operations on an unknown variable without first checking its type or asserting what it is.

let uncertainVar: unknown = 'Hello World';
// let strLength: number = uncertainVar.length; // Error: Object is of type 'unknown'

// You need type checking first:
if (typeof uncertainVar === 'string') {
  let strLength: number = uncertainVar.length; // Works
}

// 4. void
// Represents the return type of a function that does not return a value.

function logMessage(message: string): void {
  console.log(message);
  // This function returns nothing (undefined)
}

// 5. never
// Represents values that never occur. It is used for functions that always throw an exception or never finish executing (e.g., infinite loops).

function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function infiniteLoop(): never {
  while (true) {}
}

// 6. Array Types
// Represent a list of values. Can be defined in two primary ways:

// Using the element type followed by []:

let list: number[] = [1, 2, 3];
let names: string[] = ['Alice', 'Bob'];
// Using the generic array type Array<elemType>:
// let list: Array<number> = [1, 2, 3];

// 7. Tuple Types
// Allow you to express an array with a fixed number of elements where each element has a known and specific type.

// Define a tuple type for a string and a number
let person: [string, number];
person = ['Alice', 30]; // OK
// person = [30, 'Alice']; // Error: Type 'number' is not assignable to type 'string'

// 8. Object Types
// Used to represent non-primitive values. You can define the shape of an object using type annotations.

// Define the structure of the object
let user: { name: string; age: number; isActive?: boolean }; // `isActive` is optional

user = { name: 'Bob', age: 25 }; // OK
// user = { name: 'Bob' }; // Error: Property 'age' is missing

// 9. Enum Types (Enumerated Types)
// A way to define a set of named constants. Enums make it easier to document intent and create a set of distinct cases.

enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}
let c: Color = Color.Green; // 1

// You can also set string values
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
}
let d: Direction = Direction.Up; // "UP"

// 10. Union Types
// Allow a variable to be one of several types. Use the | operator to separate each type.

let id: string | number;
id = 'ABC123'; // OK
id = 123; // OK
// id = true; // Error: Type 'boolean' is not assignable to type 'string | number'

// 11. Literal Types
// Allow you to specify not just the type, but the exact value a variable must have. They are often used with unions.

let direction: 'left' | 'right' | 'up' | 'down';
direction = 'left'; // OK
// direction = 'diagonal'; // Error: Type '"diagonal"' is not assignable to type '"left" | "right" | "up" | "down"'

// 12. Type Aliases
// You can create a new name for a type using the type keyword. This is useful for complex types like objects or unions.

type ID = string | number;
type User = {
  id: ID;
  name: string;
  isActive: boolean;
};

let userId: ID = 123;
let currentUser: User = { id: userId, name: 'Alice', isActive: true };
