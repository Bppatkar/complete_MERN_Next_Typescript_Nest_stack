// what is bigint
//? Number.Max_SAFE_INTEGER=907199254740991 ,after this limit, precision issues arise.

let bigNumber: number = 907199254740991;
let x = 1;
let y = 2;

// console.log(bigNumber + x);
// console.log(bigNumber + y);
// console.log(bigNumber + y);
// number is not increasing ,getting same output again and again so that's why we use bigint
// just put 'n' in the last
//  907199254740991n;

// when we should use it
let bigNumber1 = 907199254740991n;
//? hover on variable name

// example
let bigNumber2 = 907199254740991n;
let x2 = 1n;
let y2 = 2n;

// console.log('adding x in bigint', bigNumber2 + x2);
// console.log('adding y in bigint', bigNumber2 + y2);
// console.log('adding y in bigint', bigNumber2 + y2);

// mixing issue with number datatype
