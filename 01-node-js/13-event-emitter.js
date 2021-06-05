// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance

// on and emit methods
// keep track of the order
// additional arguments
// built-in modules utilize it

const EventEmitter = require("events"); // returns a class
const customEmitter = new EventEmitter(); //instance of the class...

//defining the event....receives a callback...
//we can have as many definations we want...

//order of on and emit matters....write [on] first and then [emit] the event....
customEmitter.on("response", (name, id) => {
  console.log(`data received ${name} and ${id}`);
});

customEmitter.on("response", () => {
  console.log(`some other logic here`);
});

customEmitter.emit("response", "udit", 45); //will run both the on callbacks...

customEmitter.emit("response"); //will run both the callbacks...
