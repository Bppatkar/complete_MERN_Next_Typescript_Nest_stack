const fs = require("fs");
const os = require("os");

const eventEmmitter = require("events");

class Logger extends eventEmmitter {
  log(message) {
    this.emit("message", { message });
  }
}
const logger = new Logger();
const logFile = "./eventLog.txt";

const logToFile = (event) => {
  const logMessage = `${new Date().toLocaleTimeString()}- ${event.message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

logger.on("message", logToFile);

setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  logger.log(`Current memory usages ${memoryUsage.toFixed(2)}`);
}, 3000);

logger.log("Application started");
logger.log("Application event occurred");
