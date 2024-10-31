const db = require("./database");
let sql;

// Create Task
const createTask = (id,taskName, dueDate, dueTime, priority, callback) => {
  sql = ` INSERT INTO tasks (id, taskName, dueDate, dueTime, priority) VALUES (?,?,?,?,?)`;

  db.run(sql, [id, taskName, dueDate, dueTime, priority], callback);
};

// Read Tasks
const readTasks = (callback) => {
  sql = 'SELECT * FROM tasks';
  db.all(sql,[], callback);
};

// Update Task
const updateTask = (id, taskName, dueDate, dueTime, priority, callback) => {
  sql = ` UPDATE tasks  SET taskName  =?, dueDate = ?, dueTime = ?, priority =? WHERE id =?`;

  db.run(sql, [taskName, dueDate, dueTime, priority, id],
    callback);
}

// Delete Task
const deleteTask = (id, callback) => {
  sql = "DELETE FROM tasks WHERE id = ?";
  db.run(sql,id,callback);
}

module.exports = { createTask, readTasks, updateTask, deleteTask}


