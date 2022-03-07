var event  = require('events');

var eventEmitter = new event.EventEmitter();
var listner1=function listner1(){
    console.log("Listener1 for an event ");
}
var listner2=function listner2(){
    console.log("Listener2 for an event ");
}

// on and addListener both are same

eventEmitter.on('myevent',listner1);
eventEmitter.addListener('myevent',listner2)

eventEmitter.emit('myevent')

console.log("Number of listeners listening for myevent is"+eventEmitter.listenerCount('myevent'));
console.log("list of listeners :"+eventEmitter.listeners('myevent'));

eventEmitter.removeListener('myevent',listner2)

console.log("After Removing a listner2 \n");


console.log("Number of listeners listening for myevent is"+eventEmitter.listenerCount('myevent'));
console.log("list of listeners :"+eventEmitter.listeners('myevent'));

