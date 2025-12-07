import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import images from '../../assets/images';
import PlantInfo from '../../components/PlantInfo/PlantInfo';
import TemperatureCard from '../../components/Cards/TemperatureCard';
import WindSpeedCard from '../../components/Cards/WindSpeedCard';
import HumidityCard from '../../components/Cards/HumidityCard';
import SoilMoistureCard from '../../components/Cards/SoilMoistureCard';
import WaterTankCard from '../../components/Cards/WaterTankCard';
import LightIntensityCard from '../../components/Cards/LightIntensityCard';
import LuxHistoryChart from '../../components/Cards/LuxHistoryChart';
import RpmHistoryChart from '../../components/Cards/RpmHistoryChart';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { sensorData, luxHistory, rpmHistory, plantInfo, isLoading, error, isRealtimeConnected } = useDashboard();

  if (isLoading && !sensorData) {
    return (
      <div className="dashboard-page" style={{ backgroundImage: `url(${images.background})` }}>
        <div className="loading-container">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page" style={{ backgroundImage: `url(${images.background})` }}>
      <header className="dashboard-header">
        <h1 className="dashboard-title">Judul Proyek Ini</h1>
        <p className="dashboard-subtitle">Dashboard</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <div className="left-section">
          <PlantInfo plantInfo={plantInfo} />
        </div>

        <div className="right-section">
          <div className="cards-grid">
            {/* Row 1: Temperature, Wind Speed, Light Intensity */}
            <TemperatureCard value={sensorData.temperature} isConnected={isRealtimeConnected} />
            <WindSpeedCard value={sensorData.windSpeed} isConnected={isRealtimeConnected} />
            <LightIntensityCard value={sensorData.lightIntensity} isConnected={isRealtimeConnected} />
            
            {/* Row 2: Air Humidity, Soil Moisture, Water Tank */}
            <HumidityCard value={sensorData.airHumidity} isConnected={isRealtimeConnected} />
            <SoilMoistureCard value={sensorData.soilMoisture} isConnected={isRealtimeConnected} />
            <WaterTankCard value={sensorData.waterTankLevel} isConnected={isRealtimeConnected} />
            
            {/* Row 3: Light Intensity History */}
            <LuxHistoryChart data={luxHistory} />
            
            {/* Row 4: Fan RPM History - Firebase Integrated */}
            <RpmHistoryChart 
              data={rpmHistory} 
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
