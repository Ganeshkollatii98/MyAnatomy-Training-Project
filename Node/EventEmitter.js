var event  = require('events');

var eventEmitter = new event.EventEmitter();
var listner1=function listner1(){
    console.log("Listener1 for an event ");
}
var listner2=function listner2(){
    console.log("Listener2 for an event ");
}
eventEmitter.on('myevent',listner2);
eventEmitter.on('myevent',listner1);


eventEmitter.emit('myevent')
eventEmitter.emit('myevent')