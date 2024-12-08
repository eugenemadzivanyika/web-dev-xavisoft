import React from "react";

// TaskWrapper component is responsible for rendering the tasks passed via props
export const TaskWrapper = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div>
      {/* Iterate render each task */}
      {tasks.map((task) => (
        <div key={task._id} className="task">
         
          <div className="task-details">
            <div>
              <input
                className="checkbox"
                type="checkbox"
                onChange={() => onDeleteTask(task._id)} 
              />
            </div>
            <div>
              <p className="task-name">{task.taskName}</p>
          
              <p className="task-time">
                {task.dueDate} <span className="time">{task.dueTime}</span>
              </p>

              {task.priority && <p style={{ color: "red" }}>Important</p>}
            </div>
          </div>

          {/* Buttons for editing and deleting the task */}
          <div className="task-buttons">
          
            <button className="edit-button" onClick={() => onEditTask(task)}>
              <img className="edit-image" src="./images/edit.png" alt="edit-button" />
            </button>

            <button className="trash-button" onClick={() => onDeleteTask(task._id)}>
              <img className="trash-image" src="./images/delete.png" alt="delete-button" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
