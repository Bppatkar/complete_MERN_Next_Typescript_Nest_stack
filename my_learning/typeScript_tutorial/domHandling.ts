// how to access DOM element
let headingEl = document.querySelector('h1')!;
//! we are using ! sign in the last , if u want to know about it , remove it and hover on variable name , and again put and again check
// use exclamatory sign
console.log(headingEl?.textContent);
//? '?' mark comes automatcially , i just type headingEl.textcontent
//? if there is no '?' mark means that element is definately present in our file and ? marks means optional

// let aTag = document.querySelector('a');
// console.log(aTag?.textContent);

let anchorClass = document.querySelector('.anchorStyle')!; // hover on variable name
// typecasting
let anchorClass = document.querySelector('.anchorStyle')! as HTMLAnchorElement; // hover on variable name
console.log(anchorClass);
