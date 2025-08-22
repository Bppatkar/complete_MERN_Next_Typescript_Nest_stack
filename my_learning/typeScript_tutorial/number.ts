let nums: number = 10;
let nums1: number = 20;

let total: number = nums + nums1;
console.log(total);

// how to use binary and hexadecimal numbers
let oct = 0o100001;
let hex = 0b00001;
let binary = 0x0001;

// convert string to number
const item: number = 100;
let item1 = '50';

console.log(item + item1); // 10050
// let item1Converted = Number(item1);
let item1Converted = +item1;
console.log(item + item1Converted); //150

// type inference with number
// hover on variable name and check type
let check1 = 10;
let check2 = 'bhanu';

let id: number | string = 123;
id = 'userKey';

