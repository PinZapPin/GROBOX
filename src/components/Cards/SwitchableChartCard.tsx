import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RpmDataPoint, LuxDataPoint, SoilMoistureDataPoint, VpdDataPoint } from '../../services/dummyData';
import images from '../../assets/images';
import './SwitchableChartCard.css';

interface SwitchableChartCardProps {
  rpmData: RpmDataPoint[];
  luxData: LuxDataPoint[];
  soilMoistureData: SoilMoistureDataPoint[];
  vpdData: VpdDataPoint[];
  isConnected?: boolean;
}

type ChartView = 'rpm' | 'lux' | 'soilMoisture' | 'vpd';

const SwitchableChartCard: React.FC<SwitchableChartCardProps> = ({ 
  rpmData, 
  luxData, 
  soilMoistureData,
  vpdData,
  isConnected = false 
}) => {
  const [currentView, setCurrentView] = useState<ChartView>('rpm');

  const switchViewNext = () => {
    if (currentView === 'rpm') setCurrentView('lux');
    else if (currentView === 'lux') setCurrentView('soilMoisture');
    else if (currentView === 'soilMoisture') setCurrentView('vpd');
    else setCurrentView('rpm');
  };

  const switchViewPrev = () => {
    if (currentView === 'rpm') setCurrentView('vpd');
    else if (currentView === 'lux') setCurrentView('rpm');
    else if (currentView === 'soilMoisture') setCurrentView('lux');
    else setCurrentView('soilMoisture');
  };

  const getChartTitle = () => {
    switch (currentView) {
      case 'rpm': return 'Fan RPM History';
      case 'lux': return 'Light Intensity History';
      case 'soilMoisture': return 'Soil Moisture History';
      case 'vpd': return 'VPD History';
    }
  };

  const getChartIcon = () => {
    switch (currentView) {
      case 'rpm': return images.frame.fanIcon;
      case 'lux': return images.frame.lightIcon;
      case 'soilMoisture': return images.frame.soilmoistureIcon;
      case 'vpd': return images.frame.vpdIcon;
    }
  };

  const getCurrentData = () => {
    switch (currentView) {
      case 'rpm': return rpmData;
      case 'lux': return luxData;
      case 'soilMoisture': return soilMoistureData;
      case 'vpd': return vpdData;
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
          <LineChart data={rpmData} margin={{ top: 5, right: 20, left: 50, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              stroke="#7f8c8d" 
              style={{ fontSize: '10px', fontFamily: 'Poppins' }}
              label={{ value: 'Time', position: 'insideBottom', offset: -15, style: { fontSize: '12px' } }}
            />
            <YAxis 
              stroke="#7f8c8d" 
              style={{ fontSize: '12px', fontFamily: 'Poppins' }} 
              width={50}
              label={{ value: 'RPM', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'Poppins' }} />
            <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Poppins', paddingTop: '10px' }} verticalAlign="bottom" />
            <Line type="monotone" dataKey="fan1" name="Fan 1" stroke="#e74c3c" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
            <Line type="monotone" dataKey="fan2" name="Fan 2" stroke="#3498db" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
            <Line type="monotone" dataKey="fan3" name="Fan 3" stroke="#2ecc71" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
            <Line type="monotone" dataKey="fan4" name="Fan 4" stroke="#f39c12" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (currentView === 'lux') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={luxData} margin={{ top: 5, right: 20, left: 50, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              stroke="#7f8c8d" 
              style={{ fontSize: '10px', fontFamily: 'Poppins' }}
              label={{ value: 'Time', position: 'insideBottom', offset: -15, style: { fontSize: '12px' } }}
            />
            <YAxis 
              stroke="#7f8c8d" 
              style={{ fontSize: '12px', fontFamily: 'Poppins' }} 
              width={50}
              label={{ value: 'Light Intensity (Lux)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'Poppins' }} />
            <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Poppins', paddingTop: '10px' }} verticalAlign="bottom" />
            <Line type="monotone" dataKey="lux" name="Lux" stroke="#ffd54f" strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (currentView === 'soilMoisture') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={soilMoistureData} margin={{ top: 5, right: 20, left: 50, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              stroke="#7f8c8d" 
              style={{ fontSize: '8px', fontFamily: 'Poppins' }}
              label={{ value: 'Time', position: 'insideBottom', offset: -15, style: { fontSize: '12px' } }}
            />
            <YAxis 
              stroke="#7f8c8d" 
              style={{ fontSize: '12px', fontFamily: 'Poppins' }} 
              width={50}
              label={{ value: 'Soil Moisture (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'Poppins' }} />
            <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Poppins', paddingTop: '10px' }} verticalAlign="bottom" />
            <Line type="monotone" dataKey="soilMoisture" name="Soil Moisture" stroke="#27ae60" strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // VPD
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={vpdData} margin={{ top: 5, right: 20, left: 50, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
          <XAxis 
            dataKey="time" 
            stroke="#7f8c8d" 
            style={{ fontSize: '10px', fontFamily: 'Poppins' }}
            label={{ value: 'Time', position: 'insideBottom', offset: -15, style: { fontSize: '12px' } }}
          />
          <YAxis 
            stroke="#7f8c8d" 
            style={{ fontSize: '12px', fontFamily: 'Poppins' }} 
            width={50}
            label={{ value: 'VPD (kPa)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontFamily: 'Poppins' }} />
          <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Poppins', paddingTop: '10px' }} verticalAlign="bottom" />
          <Line type="monotone" dataKey="vpd" name="VPD" stroke="#e67e22" strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={1500} />
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
