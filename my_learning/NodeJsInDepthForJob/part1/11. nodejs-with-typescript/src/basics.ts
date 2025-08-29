//!basic types
let isDone: boolean = true;
let num: number = 12;
let str: string = 'Bhanu';
let list: number[] = [1, 2, 3, 4, 5];
let product: Array<string> = ['Product1', 'Product2', 'Product3'];
let randomVal: any = 4;
randomVal = 'Bhanu';
randomVal = true;
randomVal = {};

let xyz: undefined = undefined;
let yz: null = null;

enum Color {
  red,
  green,
  blue,
  orange,
}
let d: Color = Color.blue;
let e: Color = Color.green;
let f: Color = Color.orange;
let g: Color = Color.red;
// let h: Color = Color.purple; // error

//? tuple
let abc: [string, number, boolean] = ['product1', 101, true];

//? interfaces/types
//* interface defines data or the steps of data
//* both interface and type are used to define the structure of objects, but they differ in flexibility and usage. While interface is extendable and primarily for object shapes, type is more versatile, allowing unions, intersections, and more complex type definitions.
// example - user have - name, id and email, email is optional, and createdAt is readOnly
interface User {
  id: string | number;
  name: string;
  email?: string;
  readonly createdAt: Date;
}

const user1: User = {
  id: 101,
  name: 'Bhanu',
  createdAt: new Date(),
};
console.log(user1);

//! Type
type Product = {
  name: string;
  price: number;
};

let product1: Product = { name: 'check1', price: 12 };

//! functions with type anotations
function multiply(a: number, b: number): number {
  return a * b;
}

let divide = (a: number, b: number): number => a / b;

function greet(name: string, greeting?: string): string {
  return `${name} ${greeting}`;
}
console.log(greet('Bhanu'));
