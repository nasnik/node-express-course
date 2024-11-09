const EventEmitter = require("events");
const emitter = new EventEmitter();

setInterval(() => {
    emitter.emit("register", "User registration completed");
}, 2000);

emitter.on("register", (msg) => console.log(msg));

const waitForEmailNotification = () => {
    return new Promise((resolve) => {
        emitter.on("sendEmail", (msg) => resolve(msg));
    });
};

const handleEmailNotification = async () => {
    const msg = await waitForEmailNotification();
    console.log("Email Notification: ", msg);
};

handleEmailNotification();

setTimeout(() => {
    emitter.emit("sendEmail", "Email sent to user@example.com");
}, 3000);