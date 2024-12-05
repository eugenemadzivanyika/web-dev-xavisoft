require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB 
connectDB();

const app = express();

// Middleware configuration
app.use(express.json());           
app.use(cors(corsOptions));          // Enable CORS with specified options
app.use(express.static("../UI/build")); // Serve static files

// Custom logging middleware
app.use(logger);

// Route for to-do list API operations
app.use("/todolist", require("./routes/crud"));

// error handling middleware
app.use(errorHandler);
  
// Start server only after successful MongoDB connection
mongoose.connection.once("open", () => {
  console.log("Successfully Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
