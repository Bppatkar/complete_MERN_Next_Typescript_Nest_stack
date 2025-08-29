// In Node.js, a Buffer is a special object used to store raw binary data.
// Buffers are useful when working with files, network streams, or any data that isn't just text.
// They allow you to read and write binary data efficiently.
// For example, when you read a file or receive data over the internet, Node.js uses Buffers to handle that data.
// Buffers are especially important because JavaScript strings are only for text, not binary data.

const buffOne = Buffer.alloc(5); //allocate a buffer of 5 bytes -> zeros
console.log(buffOne); // <Buffer 00 00 00 00 00>

const buffFromString = Buffer.from('Bhanu');
console.log(buffFromString); //<Buffer 42 68 61 6e 75>

const buffFromArrayOfIntegers = Buffer.from([1, 2, 3, 4, 5, 0]);
console.log(buffFromArrayOfIntegers); // <Buffer 01 02 03 04 05 00>

buffOne.write('patkar bhanu');
console.log('After writting node js in BuffOne', buffOne.toString()); //After writting node js in BuffOne patka

console.log(buffFromString[0]); //66 [beacuse B is 66, A is 65, a - 97]

console.log(buffFromString.slice(0, 3)); // <Buffer 42 68 61>

const concatBuffs = Buffer.concat([buffOne, buffFromString]);
console.log('After concatination', concatBuffs); // After concatination <Buffer 42 68 61 6e 75 42 68 61 6e 75>

console.log('Json File', concatBuffs.toJSON());
/*
Json File {
  type: 'Buffer',
  data: [
     66, 104,  97, 110,
    117,  66, 104,  97,
    110, 117
  ]
}
*/
