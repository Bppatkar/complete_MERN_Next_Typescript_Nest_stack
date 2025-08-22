//apply string data type
let str: string = 'hello how r u ?';

// way to define string [single quote, double and backtick]
let str1: string = 'hello how r u ?';
let str2: string = 'hello how r u ?';
let str3: string = `hello how r u ?`;

// convert in string data type
// method 1 - automatically convert
let userAge: number = 25;
let userName: string = 'Bhanu';

let userInfo = `my name is ${userName} and my age is ${userAge}`;
console.log(userInfo);

// method 2
let num: number = 100;
// let data:string =  num; // Type 'number' is not assignable to type 'string'
let data: string = num.toString();

let data1: string = ' ' + num;

// apply boolean data type
let boolData: boolean = true;
let bboData: string = boolData.toString();
let bboData1: string = ' ' + bboData;

// possible boolean values
//? only true and false will possible

// inference/idea/anuman and declaration issues
//? just hover on variable name and get a type
let info1 = 'bhanu';
let info2 = 20;

// run with html file
//? create html file connect js file and see output in browser console
