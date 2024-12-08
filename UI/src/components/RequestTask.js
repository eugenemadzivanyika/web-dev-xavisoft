import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = "http://localhost:3500/todolist";

export const RequestTask = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task
  const handleAddTask = (newTask) => {
    axios
      .post(URL, newTask)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Edit an existing task
  const handleEditTask = (updatedTask) => {
    axios
      .put(`${URL}/${updatedTask._id}`, updatedTask)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => 
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      })
      .catch((error) => console.error("Error editing task:", error));

    setIsEditing(false);
    setTaskToEdit(null);
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error.message);
        console.error("Axios Error Details:", error.toJSON());
      });
  };

  return {
    tasks,
    taskToEdit,
    isEditing,
    setTaskToEdit,
    setIsEditing,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
  };
};

