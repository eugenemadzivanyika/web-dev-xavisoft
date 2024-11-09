const express = require("express");
const router = express.Router();
const tasksController = require("../controller/tasksController");

// Routes for handling task operations
router.route("/")
  .get(tasksController.readTasks)     // Retrieve all tasks
  .post(tasksController.createTask);   // Create a new task

router.route("/:id")
  .put(tasksController.updateTask)     // Update a task using ID
  .delete(tasksController.deleteTask); // Delete a task using ID

module.exports = router;





