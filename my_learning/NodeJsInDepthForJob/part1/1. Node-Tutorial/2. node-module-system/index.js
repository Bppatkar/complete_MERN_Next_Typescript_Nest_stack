import firstModule from './first-module.js';

console.log(firstModule.add(1, 2));
console.log(firstModule.subtract(1, 2));
console.log(firstModule.divide(1, 2));

try {
  console.log('trying to divide by zero');
  let result = firstModule.divide(0, 10);
  console.log(result);
} catch (error) {
  console.error('Caught an error:', error.message);
}
