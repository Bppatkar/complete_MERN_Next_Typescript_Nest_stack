// when a function return nothing - void
// when a function is not  in a state that can return something - never
// means it cant execute properly or we can say's it's last line will never executed

function loopFunction(): never {
  while (true) {
    console.log('loop');
  }
}
loopFunction();
// _____________________________
// function simple(): never {
//   console.log('simple');
// }
//? getting error
//? A function returning 'never' cannot have a reachable end point.

const simple1 = (): never => {
  throw new Error('Data will never updated');
};

//? it is working in error
