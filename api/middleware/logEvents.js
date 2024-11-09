const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Function to log events to a specified file
const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`; 
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;          

  try {
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    // Append log entry to the specified log file
    await fsPromises.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
  } catch (error) {
    console.error(error);
  }
}

// Middleware to log each request's method, origin, and URL
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "requestLog.txt");
  next(); // Proceed to the next middleware
}

module.exports = { logger, logEvents };
