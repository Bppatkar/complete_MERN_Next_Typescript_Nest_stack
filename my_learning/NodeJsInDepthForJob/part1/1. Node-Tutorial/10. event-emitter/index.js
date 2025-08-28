import EventEmitter from 'events';

const myFirstEmitter = new EventEmitter();

// register a listener
myFirstEmitter.on('greet', (name) => {
  console.log(` hello ${name}`);
});

myFirstEmitter.emit('greet', 'Bhanu');

//emit is used to trigger an event
// on is used to add a callback function that's going to be executed when the event is triggered