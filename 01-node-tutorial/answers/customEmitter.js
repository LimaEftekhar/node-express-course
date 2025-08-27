const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.on("userLoggedIn", (username) => {
  console.log(`Welcome back, ${username}!`);
});

myEmitter.on("userLoggedIn", (username) => {
  console.log(` ${username} has just logged in.`);
});

//Trigger another event
myEmitter.on("userLoggedIn", (username) => {
  myEmitter.emit("sendNotification", username);
});


myEmitter.on("sendNotification", (username) => {
  console.log(`Notification sent to ${username}`);
});


myEmitter.emit("userLoggedIn", "Lima"); 
myEmitter.emit("userLoggedIn", "Meno");