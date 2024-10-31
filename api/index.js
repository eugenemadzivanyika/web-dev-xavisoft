const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();
const { createTask, readTasks, updateTask, deleteTask} = require("./crud");
const cors = require('cors');

const PORT = process.env.PORT || 3500;

// Dummy data
/*
const toDoList = [
  { id: uuid(), taskName: 'eat', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Important'},
  { id: uuid(), taskName: 'sleep', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Not Important'},
  { id: uuid(), taskName: 'pray'},
  { id: uuid(), taskName: 'read bible' }
];
*/

app.use(express.json());
app.use(cors());

// Fetch all tasks
app.get("/todolist", (req, res) => {
  // res.json(toDoList);
  readTasks((err, rows) => {
    if(err){
      res.status(500).send(err.message);
    } else{
      res.status(200).json(rows);
    }
  });
});

// Add a new task
app.post("/todolist", (req, res) => {
  // let newTask = {uuid(), ...req.body}
  // if (newTask.priority === 'Important') {
  //   toDoList.unshift(newTask);
  // } else {
  //   toDoList.push(newTask);
  // }

  // res.json({ msg: "Task added", data: newTask });
  
  const id = uuid();
  const {taskName, dueDate, dueTime, priority} = req.body;
  createTask(id,taskName, dueDate, dueTime, priority, (err, data) => { 
    if(err){
      res.status(500).send(err);
    }else{
      res.status(201).send(`Task Added where ID: ${id}`);
    }
  });
});

// Update a task using id
app.put("/todolist/:id", (req, res) => {
  // const task = toDoList.find(task => task.id === req.params.id);
  
  // if (task) {
  //   task.taskName = req.body.taskName;
  //   task.dueDate = req.body.dueDate;
  //   task.dueTime = req.body.dueTime;
  //   task.priority = req.body.priority;
  //   res.json({ msg: "Edit task", data: toDoList });
  // } else {
  //   res.status(404).json({ msg: "Task not found" });
  // }

  const {taskName, dueDate, dueTime, priority} = req.body;

  updateTask(req.params.id, taskName, dueDate, dueTime, priority, (err) => {
    if(err){
      res.status(500).send(err.message)
    } else{
      res.status(200).send("Task Updated")
    }
  })
});

// Delete a task by id
app.delete("/todolist/:id", (req, res) => {
  // const taskIndex = toDoList.findIndex(task => task.id === req.params.id);
  
  // if (taskIndex !== -1) {
  //   toDoList.splice(taskIndex, 1);
  //   res.json({ msg: "Deleted Task", data: toDoList });
  // } else {
  //   res.status(404).json({ msg: "Task not found" });
  // }

  deleteTask(req.params.id, (err) => {
    if(err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send("Task deleted")
    }
  })
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
