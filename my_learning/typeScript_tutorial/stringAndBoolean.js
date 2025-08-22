//apply string data type
var str = 'hello how r u ?';
// way to define string [single quote, double and backtick]
var str1 = 'hello how r u ?';
var str2 = 'hello how r u ?';
var str3 = "hello how r u ?";
// convert in string data type
// method 1 - automatically convert
var userAge = 25;
var userName = 'Bhanu';
var userInfo = "my name is ".concat(userName, " and my age is ").concat(userAge);
console.log(userInfo);
// method 2
var num = 100;
// let data:string =  num; // Type 'number' is not assignable to type 'string'
var data = num.toString();
var data1 = ' ' + num;
// apply boolean data type
var boolData = true;
var bboData = boolData.toString();
var bboData1 = ' ' + bboData;
// possible boolean values
//? only true and false will possible
// inference/idea/anuman and declaration issues
//? just hover on variable name and get a type
var info1 = 'bhanu';
var info2 = 20;
// run with html file
//? create html file connect js file and see output in browser console
