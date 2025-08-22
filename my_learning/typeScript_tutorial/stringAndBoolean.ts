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
let boolData: boolean = true;
// let data:string =  num; // Type 'number' is not assignable to type 'string'
let data: string = num.toString();
let bboData: string = boolData.toString();

let data1: string = ' ' + num;
let bboData1: string = ' ' + bboData;

// apply boolean data type

// possible boolean values

// inference and declaration issues

// run with html file
