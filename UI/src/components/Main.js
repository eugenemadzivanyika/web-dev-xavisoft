import React, { useState } from "react";
import { Modal } from "./Modal";
import { TaskWrapper } from "./TaskWrapper"; 
import { Footer } from "./Footer"; 
import { RequestTask } from "./RequestTask";

export const Main = () => {
  // Destructure values from the custom RequestTask hook
  const {
    tasks,
    taskToEdit,
    isEditing,
    setTaskToEdit,
    setIsEditing,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
  } = RequestTask(); // Custom hook managing tasks

  
  const [showModal, setShowModal] = useState(false);

  // Show the modal for editing a task
  const handleShowModalForEdit = (task) => {
    if (task) {

      setTaskToEdit(task);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
   
    setShowModal(false);
    setIsEditing(false);
    setTaskToEdit(null);
  };

  // Show the modal for adding a new task
  const handleShowModalForAdd = () => {
    
    setShowModal(true);
    setIsEditing(false); 
  };

  // Sort tasks first by priority (important tasks first), then by due date and time
const sortedTasks = tasks.sort((a, b) => {
  
  if (a.priority && !b.priority) return -1;
  if (!a.priority && b.priority) return 1;


  if (a.dueDate && b.dueDate) {
    const dateA = new Date(a.dueDate);  
    const dateB = new Date(b.dueDate);  
    return dateA - dateB;
  }
  
  
  if (a.dueTime && b.dueTime) {
    const timeA = new Date(`${a.dueDate}T${a.dueTime}`);  
    const timeB = new Date(`${b.dueDate}T${b.dueTime}`); 
    return timeA - timeB;  
  }

  return 0;
});


  return (
    <div>
      {/* Display tasks using TaskWrapper, passing sorted tasks and handlers for edit/delete */}
      <TaskWrapper
        tasks={sortedTasks} 
        onEditTask={handleShowModalForEdit} // Show modal to edit task
        onDeleteTask={handleDeleteTask} // Delete selected task
      />

      {/* Modal for adding/editing tasks */}
      <Modal
        visible={showModal} // Show modal based on state
        onClose={handleCloseModal} // Close modal when clicked
        onAddTask={handleAddTask} // Handler for adding new tasks
        onEditTask={handleEditTask} // Handler for editing tasks
        task={taskToEdit} // Pass the current task (if editing)
        isEditing={isEditing} // Indicate whether it's an edit or add action
      />
      
      {/* Button to trigger modal for adding a new task */}
      <button className="add-task-button" onClick={handleShowModalForAdd}>
        +
      </button>
      
      {/* Footer component with additional task-related actions */}
      <Footer onAddQuickTask={handleAddTask} />
    </div>
  );
};
//