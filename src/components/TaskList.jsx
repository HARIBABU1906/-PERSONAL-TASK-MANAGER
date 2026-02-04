import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { useTask } from '../context/TaskContext';
import { taskAPI } from '../api';
import '../styles/taskList.css';

const TaskList = () => {
  const { tasks, loading, error, setAllTasks, setLoading, setError } = useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskAPI.getTasks();
      setAllTasks(response.data.tasks);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="task-list-loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  return (
    <div className="task-list-container">
      <div className="task-stats">
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{pendingTasks.length}</span>
        </div>
        <div className="stat-card in-progress">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{inProgressTasks.length}</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completedTasks.length}</span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} onUpdate={fetchTasks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
