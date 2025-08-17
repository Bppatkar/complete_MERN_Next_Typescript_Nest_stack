function delayFunc(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

console.log('Promise lecture Start');
delayFunc(2000)
  .then(() => console.log('after 2 seconds promise resolved'))
  .catch((error) => console.error(error)); //added catch block here
console.log('End');

function divideFunc(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject(new Error('Cannot divide by zero'));
    } else {
      resolve(num1 / num2);
    }
  });
}

divideFunc(10, 0)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// Debouncing Function

// Debouncing Function: The function will be called after the specified delay
// has passed since the last time it was invoked.
/* function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
} */

// Throttling Function: The function will be called at most once in the time
// period specified by the delay.
/* function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
} */
