const express = require("express");
const { v4: uuid } = require("uuid");
const toDoListApp = express();
const cors = require('cors');

const PORT = process.env.PORT || 3500;

// Dummy data
const toDoList = [
  { id: uuid(), taskName: 'eat', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Important'},
  { id: uuid(), taskName: 'sleep', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Not Important'},
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
  
  if (newTask.priority === 'Important') {
    toDoList.unshift(newTask);
  } else {
    toDoList.push(newTask);
  }

  res.json({ msg: "Task added", data: newTask });
});

// Update a task using id
toDoListApp.put("/todolist/:id", (req, res) => {
  const task = toDoList.find(task => task.id === req.params.id);
  
  if (task) {
    task.taskName = req.body.taskName;
    task.dueDate = req.body.dueDate;
    task.dueTime = req.body.dueTime;
    task.priority = req.body.priority;
    res.json({ msg: "Edit task", data: toDoList });
  } else {
    res.status(404).json({ msg: "Task not found" });
  }
});

// Delete a task by id
toDoListApp.delete("/todolist/:id", (req, res) => {
  const taskIndex = toDoList.findIndex(task => task.id === req.params.id);
  
  if (taskIndex !== -1) {
    toDoList.splice(taskIndex, 1);
    res.json({ msg: "Deleted Task", data: toDoList });
  } else {
    res.status(404).json({ msg: "Task not found" });
  }
});

// Start the server
toDoListApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
