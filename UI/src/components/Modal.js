import React, { useState, useEffect } from "react";

// Modal component for adding or editing tasks
export const Modal = ({ visible, onClose, onAddTask, onEditTask, task, isEditing }) => {
  const [formState, setFormState] = useState({
    taskName: "",
    dueDate: "",
    dueTime: "",
    priority: false,
  });

  // Populate form state when editing an existing task
  useEffect(() => {
    if (isEditing && task) {
   
      setFormState({
        taskName: task.taskName || "",
        dueDate: task.dueDate || "",
        dueTime: task.dueTime || "",
        priority: task.priority || false,
      });
    } else {
      // If not editing, clear the form
      setFormState({
        taskName: "",
        dueDate: "",
        dueTime: "",
        priority: false,
      });
    }
  }, [isEditing, task]); 

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission for adding or edittting task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formState.taskName.trim() === "") {
      alert("Please fill in the task name");
      return;
    }

    if (isEditing) {
      onEditTask({ ...task, ...formState }); 
    } else {
      onAddTask({ ...formState }); 
    }

    
    setFormState({ taskName: "", dueDate: "", dueTime: "", priority: false });
    onClose(); 
  };

  if (!visible) return null;

  return (
    <div className={`bg-modal ${visible ? "visible" : "hidden"}`}>
      <div className="modal">
       
        <div className="pop-up-header">
          <div className="buttons container">
            <button
              className="back-button"
              id="back-button"
              onClick={onClose} 
            >
              &#8592;
            </button>
          </div>
          {/* Display text based on whether it's editing or adding a task */}
          <p className="new-task-header-text">
            {isEditing ? "Edit Task" : "New Task"}
          </p>
        </div>

        {/* Form to add or edit task */}
        <form className="new-task-container" onSubmit={handleSubmit}>
          {/* Task Name Input */}
          <div className="task-details-container">
            <label htmlFor="taskName" className="new-task-headlines">Task:</label>
            <input
              id="taskName"
              className="new-task-name task-input"
              type="text"
              name="taskName"
              placeholder="Enter Task Here"
              value={formState.taskName}
              onChange={handleInputChange} // Update state on input change
              required
            />
          </div>

          {/* Due Date Input */}
          <div className="task-details-container">
            <label htmlFor="dueDate" className="new-task-headlines">Due Date:</label>
            <input
              id="dueDate"
              className="due-date task-input"
              type="date"
              name="dueDate"
              value={formState.dueDate}
              onChange={handleInputChange} // Update state on input change
            />
          </div>

          {/* Due Time Input */}
          <div className="time-container task-details-container">
            <label htmlFor="dueTime" className="new-task-headlines">Due Time:</label>
            <input
              id="dueTime"
              className="due-time task-input"
              type="time"
              name="dueTime"
              value={formState.dueTime}
              onChange={handleInputChange} 
            />
          </div>

          {/* Priority Checkbox */}
          <div className="priority-level task-details-container">
            <div className="urgent">
              <label htmlFor="urgent-checkbox" className="priority-text">
                Important
              </label>
              <input
                id="urgent-checkbox"
                className="priority-checkbox"
                type="checkbox"
                name="priority"
                checked={formState.priority} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="add-new-task-button"
              id="add-new-task-button"
            >
              &#10003;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
