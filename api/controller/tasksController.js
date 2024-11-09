const Task = require("../model/Task");

// Read all tasks from the database
const readTasks = async (req, res) => {
  const tasks = await Task.find(); 
  if (!tasks) return res.status(204).json({"message" : "No tasks found."});  // No tasks found
  res.json(tasks);  // Send tasks as JSON response
}

// Create a new task in the database
const createTask = async (req, res) => {
  const { taskName, dueDate, dueTime, priority } = req.body;

  if (!taskName) {  // Validate that task name is provided
    return res.status(400).json({"message": "Task name is required"});
  }

  try {
    const newTask = await Task.create({
      taskName,
      dueDate,
      dueTime,
      priority
    });
    res.status(201).json(newTask);  // Return created task
  } catch (error) {
    console.error(error);  // Log error if creation fails
  }
}

// Update an existing task by ID
const updateTask = async (req, res) => {
  const id = req.params.id;
  const { taskName, dueDate, dueTime, priority } = req.body;

  if (!id) {  // Ensure ID is provided
    return res.status(400).json({"message": "ID parameter is required"});
  }

  const task = await Task.findOne({ _id: id }).exec();  // Find task by ID
  if (!task) {  // If no task found, return 204 response
    return res.status(204).json({"message": `No task matches ID: ${id}`});
  }

  // Update task fields if provided
  if (taskName) task.taskName = taskName;
  if (dueDate) task.dueDate = dueDate;
  if (dueTime) task.dueTime = dueTime;
  if (priority) task.priority = priority;

  const updatedTask = await task.save();  // Save the updated task
  res.json(updatedTask);  // Return updated task
}

// Delete a task by ID
const deleteTask = async (req, res) => {
  const id = req.params.id;

  if (!id) {  // Ensure ID is provided
    return res.status(400).json({"message": "ID parameter is required"});
  }

  const task = await Task.findOne({ _id: id }).exec();  // Find task by ID
  if (!task) {  // If no task found, return 204 response
    return res.status(204).json({"message": `No task matches ID: ${id}`});
  }

  const deletedTask = await task.deleteOne({ _id: id });  // Delete the task
  res.json(deletedTask);  // Return deleted task details
}

module.exports = {
  readTasks, 
  createTask, 
  updateTask,
  deleteTask
}
