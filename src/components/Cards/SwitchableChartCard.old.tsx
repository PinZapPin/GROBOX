import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RpmDataPoint, LuxDataPoint } from '../../services/dummyData';
import images from '../../assets/images';
import './SwitchableChartCard.css';

interface SwitchableChartCardProps {
  rpmData: RpmDataPoint[];
  luxData: LuxDataPoint[];
  soilMoistureData?: any[]; // Placeholder for future soil moisture data
  isConnected?: boolean;
}

type ChartView = 'rpm' | 'lux' | 'soilMoisture';

const SwitchableChartCard: React.FC<SwitchableChartCardProps> = ({ 
  rpmData, 
  luxData, 
  soilMoistureData = [],
  isConnected = false 
}) => {
  const [currentView, setCurrentView] = useState<ChartView>('rpm');

  const switchViewNext = () => {
    if (currentView === 'rpm') setCurrentView('lux');
    else if (currentView === 'lux') setCurrentView('soilMoisture');
    else setCurrentView('rpm');
  };

  const switchViewPrev = () => {
    if (currentView === 'rpm') setCurrentView('soilMoisture');
    else if (currentView === 'lux') setCurrentView('rpm');
    else setCurrentView('lux');
  };

  const getChartTitle = () => {
    switch (currentView) {
      case 'rpm': return 'Fan RPM History';
      case 'lux': return 'Light Intensity History';
      case 'soilMoisture': return 'Soil Moisture History';
    }
  };

  const getChartIcon = () => {
    switch (currentView) {
      case 'rpm': return images.frame.fanIcon;
      case 'lux': return images.frame.lightIcon;
      case 'soilMoisture': return images.frame.soilmoistureIcon;
    }
  };

  const getCurrentData = () => {
    switch (currentView) {
      case 'rpm': return rpmData;
      case 'lux': return luxData;
      case 'soilMoisture': return soilMoistureData;
    }
  };

  const renderChart = () => {
    const data = getCurrentData();

    if (!isConnected || data.length === 0) {
      return (
        <div className="chart-no-data">
          <span className="no-data-text">(No Data)</span>
        </div>
      );
    }

    if (currentView === 'rpm') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rpmData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
            <XAxis dataKey="time" stroke="#7f8c8d" style={{ fontSize: '12px', fontFamily: 'Poppins' }} />
            <YAxis stroke="#7f8c8d" style={{ fontSize: '12px', fontFamily: 'Poppins' }} width={50} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'Poppins' }} />
            <Line type="monotone" dataKey="fan1" stroke="#e74c3c" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
            <Line type="monotone" dataKey="fan2" stroke="#3498db" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
            <Line type="monotone" dataKey="fan3" stroke="#2ecc71" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
            <Line type="monotone" dataKey="fan4" stroke="#f39c12" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (currentView === 'lux') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={luxData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
            <XAxis dataKey="time" stroke="#7f8c8d" style={{ fontSize: '12px', fontFamily: 'Poppins' }} />
            <YAxis stroke="#7f8c8d" style={{ fontSize: '12px', fontFamily: 'Poppins' }} width={50} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'Poppins' }} />
            <Line type="monotone" dataKey="value" stroke="#f39c12" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Soil Moisture - placeholder
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={soilMoistureData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
          <XAxis dataKey="time" stroke="#7f8c8d" style={{ fontSize: '12px', fontFamily: 'Poppins' }} />
          <YAxis stroke="#7f8c8d" style={{ fontSize: '12px', fontFamily: 'Poppins' }} width={50} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'Poppins' }} />
          <Line type="monotone" dataKey="value" stroke="#8b4513" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="switchable-chart-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">{getChartTitle()}</h3>
        <div className="card-header-actions">
          <div className="card-icon">
            <img src={getChartIcon()} alt={getChartTitle()} />
          </div>
          <div className="chart-nav-buttons">
            <button className="switch-chart-btn" onClick={switchViewPrev} title="Previous chart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="switch-chart-btn" onClick={switchViewNext} title="Next chart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default SwitchableChartCard;
