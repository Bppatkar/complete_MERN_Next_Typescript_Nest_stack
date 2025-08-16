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