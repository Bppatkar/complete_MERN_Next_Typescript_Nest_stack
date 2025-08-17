import EventEmitter from 'events';

class MyCustomEmitter extends EventEmitter {
  constructor() {
    super();
    this.greeting = 'Hello';
  }

  greet(name) {
    this.emit('greeting', `${this.greeting} ${name}`);
  }
}

const myCustomEmitter = new MyCustomEmitter();

myCustomEmitter.on('greeting', (message) => {
  console.log('Greeting Event', message);
});

myCustomEmitter.greet('Bhanu');

// emit is used to trigger an event
// on is used to add a callback function that's going to be executed when the event is triggered
