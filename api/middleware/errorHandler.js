const { logEvents } = require("./logEvents");

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errorLog.txt");  // Log error details
  console.log(err.stack);                                    
  res.status(500).send(err.message);                         
  next();                                                   
}

module.exports = errorHandler;
