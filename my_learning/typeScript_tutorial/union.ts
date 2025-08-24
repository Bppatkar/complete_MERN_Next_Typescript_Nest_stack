// what is union types
//? when we define multiple datatypes for a single data like

// use union type with variable data type
let unionCheck: string | number | boolean | undefined | null;

// use union type with function data type

function fruitsData(): string | string[] | number {
  let item = 1;
  if (item > 1) {
    return ['apple', 'banana'];
  } else return 'Apple';
}
console.log(fruitsData());

// use union type with function params data type
function studentInfo(age: number | string) {
  return age;
}
studentInfo(20);
studentInfo('bhanu');
// type check with union type
