import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ManualControlPage from './pages/ManualControl/ManualControlPage';
import AboutPage from './pages/About/AboutPage';
import './App.css';
import './components/Cards/BaseCard.css';

const App: React.FC = () => {
  return (
    <Router>
      <DashboardProvider>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/manual-control" element={<ManualControlPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </div>
      </DashboardProvider>
    </Router>
  );
};

export default App;
