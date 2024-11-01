const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();
const { createTask, readTasks, updateTask, deleteTask} = require("./crud");
const cors = require('cors');
const path = require("path");

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cors());

app.use(express.static("../To do List"));
app.use(express.static("../To do List/scripts"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../To do List", "main.html"));
})

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
