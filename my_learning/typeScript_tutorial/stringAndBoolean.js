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
var boolData = true;
// let data:string =  num; // Type 'number' is not assignable to type 'string'
var data = num.toString();
var bboData = boolData.toString();
var data1 = ' ' + num;
var bboData1 = ' ' + bboData;
// apply boolean data type
// possible boolean values
// inference and declaration issues
// run with html file
