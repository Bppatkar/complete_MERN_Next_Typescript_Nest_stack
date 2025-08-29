import fs from 'fs';
import crypto from "crypto"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//! Event Loop in Node.js (Simple Points)

//?  1. JavaScript is single-threaded, but Node.js uses the event loop for non-blocking I/O.
// 2. The event loop has several phases:
//    - Timers: Runs setTimeout and setInterval callbacks.
//    - Pending Callbacks: Handles I/O callbacks deferred to the next loop.
//    - Idle/Prepare: Internal use.
//    - Poll: Gets new I/O events and runs I/O-related callbacks.
//    - Check: Runs setImmediate callbacks.
//    - Close Callbacks: Runs close event callbacks (like socket.on('close')).
// 3. Microtasks (Promises, process.nextTick) run after each phase, before moving to the next phase.
// 4. Execution Priority (High to Low):
//    1. Synchronous code (Call Stack)
//    2. process.nextTick() (Node.js)
//    3. Microtasks (Promises)
//    4. setTimeout/setInterval (Callback Queue)
//    5. setImmediate() (Node.js)
// 5. Summary:
//    - Synchronous code runs first.
//    - Microtasks run after synchronous code.
//    - Timers and I/O callbacks run after microtasks.
//    - setImmediate runs after I/O callbacks, before timers.

// timers -> pending callbacks -> idle, prepare -> poll -> check -> close callback



console.log('1. script start');

setTimeout(() => {
  console.log('2. settimeout 0s callback (macrotask)');
}, 0);

setTimeout(() => {
  console.log('3. settimeout 0s callback (macrotask)');
}, 0);

setImmediate(() => {
  console.log('4. setImmediate callback (check)');
});

Promise.resolve().then(() => {
  console.log('5. Promise resolved (microtask)');
});

process.nextTick(() => {
  console.log('6. process.nexttick callback (microtask)');
});

fs.readFile(__filename, () => {
  console.log('7. file read operation (I/O callback)');
});

crypto.pbkdf2('secret', 'salt', 10000, 64, 'sha512', (err, key) => {
  if (err) throw err;
  console.log('8. pbkdf2 operation completed (CPU intensive task)');
});

console.log('9. script ends');



//! Output

/*
 * 1. script start
 * 9. script ends
 * 6. process.nexttick callback (microtask)
 * 5. Promise resolved (microtask)
 * 2. settimeout 0s callback (macrotask)
 * 3. settimeout 0s callback (macrotask)
 * 4. setImmediate callback (check)
 * 8. pbkdf2 operation completed (CPU intensive task)
 * 7. file read operation (I/O callback)
 */
