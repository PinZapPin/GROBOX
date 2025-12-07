import React from 'react';
import { NavLink } from 'react-router-dom';
import images from '../../assets/images';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={images.frame.logo} alt="Logo" className="logo-image" />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title="Dashboard">
          <img src={images.sidebar.dashboardIcon} alt="Dashboard" className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </NavLink>

        <NavLink to="/manual-control" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title="Manual Control">
          <img src={images.sidebar.controlIcon} alt="Manual Control" className="nav-icon" />
          <span className="nav-label">Manual Control</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title="About">
          <img src={images.sidebar.aboutIcon} alt="About" className="nav-icon" />
          <span className="nav-label">About</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
