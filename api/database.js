const sqlite3 = require("sqlite3").verbose();
const dbName = "to-do-list-database.db";

let sql;

let db = new sqlite3.Database(dbName,(err) => {
  if (err) {
    console.log(err.message);   
  } else {
    console.log("Connection Successful");

    sql = `CREATE TABLE IF NOT EXISTS tasks (id TEXT,
      taskName TEXT,
      dueDate TEXT,
      dueTime TEXT,
      priority TEXT)`;

    db.run(sql, (err) => {
      if(err){
        console.log(err.message);
      } else {
        console.log("Table created successfully or Already exists");
        
      }
    })
  }
})

module.exports = db;
