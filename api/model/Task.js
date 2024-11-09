const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for a Task document in MongoDB
const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true    // Task name is mandatory
  },
  dueDate: String,    
  dueTime: String,    
  priority: String    
});

module.exports = mongoose.model("Task", taskSchema);
