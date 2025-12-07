import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/assets/frame/logo.png" alt="Logo" className="logo-image" />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title="Dashboard">
          <img src="/assets/sidebar/dashboardIcon.png" alt="Dashboard" className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </NavLink>

        <NavLink to="/manual-control" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title="Manual Control">
          <img src="/assets/sidebar/controlIcon.png" alt="Manual Control" className="nav-icon" />
          <span className="nav-label">Manual Control</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title="About">
          <img src="/assets/sidebar/aboutIcon.png" alt="About" className="nav-icon" />
          <span className="nav-label">About</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
