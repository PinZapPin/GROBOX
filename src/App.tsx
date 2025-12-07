import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ManualControlPage from './pages/ManualControl/ManualControlPage';
import AboutPage from './pages/About/AboutPage';
import './App.css';
import './components/Cards/BaseCard.css';

const App: React.FC = () => {
  return (
    <Router basename="/GROBOX">
      <DashboardProvider>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/manual-control" element={<ManualControlPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Redirect semua route tidak dikenal ke Dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </DashboardProvider>
    </Router>
  );
};

export default App;
