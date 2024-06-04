const EventEmitter = require("events");
const LogEvents = require("./LogEvents");
// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

eventEmitter.on("log", async (message) => {
  await LogEvents(message);
});

setTimeout(() => {
  const message = "New log event emitted";
  eventEmitter.emit("log", message);
}, 2000);
