const express = require("express");
const { v4: uuid } = require("uuid");
const toDoListApp = express();
const cors = require('cors');

const PORT = process.env.PORT || 3500;

// Updating the initial task list to use UUIDs instead of integers for id
const toDoList = [
  { id: uuid(), taskName: 'eat', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Urgent'},
  { id: uuid(), taskName: 'sleep', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Not urgent'},
  { id: uuid(), taskName: 'pray'},
  { id: uuid(), taskName: 'read bible' }
];

toDoListApp.use(express.json());
toDoListApp.use(cors());

// Fetch all tasks
toDoListApp.get("/todolist", (req, res) => {
  res.json(toDoList);
});

// Add a new task
toDoListApp.post("/todolist", (req, res) => {
  const newTask = { id: uuid(), ...req.body };
  toDoList.push(newTask);
  res.json({ msg: "Add task", data: newTask });
});

// Delete a task by id
toDoListApp.delete("/todolist/:id", (req, res) => {
  const taskIndex = toDoList.findIndex(task => task.id === req.params.id);
  
  if (taskIndex !== -1) {
    toDoList.splice(taskIndex, 1);
    res.json({ msg: "Delete Task", data: toDoList });
  } else {
    res.status(404).json({ msg: "Task not found" });
  }
});

// Start the server
toDoListApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
