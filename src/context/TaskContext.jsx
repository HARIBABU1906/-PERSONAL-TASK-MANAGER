import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const updateTaskInState = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const setAllTasks = (allTasks) => {
    setTasks(allTasks);
  };

  const value = {
    tasks,
    loading,
    error,
    addTask,
    removeTask,
    updateTaskInState,
    setAllTasks,
    setLoading,
    setError,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
