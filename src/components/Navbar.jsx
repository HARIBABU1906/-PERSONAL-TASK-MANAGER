import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">📋 Task Manager</h1>
        {user && (
          <div className="navbar-menu">
            <span className="navbar-user">Welcome, {user.username}!</span>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
