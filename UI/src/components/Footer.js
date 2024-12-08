import React, { useState } from 'react'; 
import { FaCheck } from 'react-icons/fa';

export const Footer = ({ onAddQuickTask }) => {
  const [quickTask, setQuickTask] = useState(""); 

  // Submit new quick task
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (quickTask.trim()) { 
      const newQuickTask = {
        taskName: quickTask,
      };

      onAddQuickTask(newQuickTask); 
      setQuickTask(""); 
    } else {
      alert("Please enter a task."); 
    }
  };

  return (
    <footer className="footer">
      {/* Form to handle the quick task */}
      <form onSubmit={handleSubmit} className="quick-task-form"> 
        <input
          className="quick-task-box"
          id="quick-task-box"
          type="text"
          placeholder="Enter Quick Task Here"
          value={quickTask} 
          onChange={(e) => setQuickTask(e.target.value)} 
        />
        <button type="submit" className="submit-btn">
          <FaCheck style={{ color: 'White', fontSize: '50px' }} />
        </button>
      </form>
    </footer>
  );
};
