import React, { useState } from 'react';
import { taskAPI } from '../api';
import { useTask } from '../context/TaskContext';
import '../styles/taskItem.css';

const TaskItem = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);
  const [loading, setLoading] = useState(false);
  const { removeTask, updateTaskInState } = useTask();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await taskAPI.deleteTask(task._id);
        removeTask(task._id);
      } catch (err) {
        alert('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const response = await taskAPI.updateTask(task._id, {
        ...editData,
        status: newStatus,
      });
      updateTaskInState(task._id, response.data.task);
      setEditData(response.data.task);
    } catch (err) {
      alert('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const response = await taskAPI.updateTask(task._id, editData);
      updateTaskInState(task._id, response.data.task);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#f59e0b';
      case 'pending':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <div className="task-title-section">
          {!isEditing && (
            <h3 className="task-title">{task.title}</h3>
          )}
          {isEditing && (
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="task-edit-input"
            />
          )}
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority.toUpperCase()}
          </span>
        </div>
        <div className="task-actions">
          <select
            value={editData.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="status-select"
            style={{ borderColor: getStatusColor(editData.status) }}
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {task.description && (
        <div className="task-description">
          {!isEditing && (
            <p>{task.description}</p>
          )}
          {isEditing && (
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="task-edit-textarea"
            />
          )}
        </div>
      )}

      <div className="task-meta">
        {task.dueDate && (
          <span className="due-date">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        <span className="created-date">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="task-buttons">
        {!isEditing && (
          <>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
              disabled={loading}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          </>
        )}
        {isEditing && (
          <>
            <button
              className="btn btn-success"
              onClick={handleSaveEdit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
