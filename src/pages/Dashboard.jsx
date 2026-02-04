import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Manage your tasks efficiently</p>
      </div>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <TaskForm />
        </aside>

        <main className="dashboard-main">
          <TaskList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
