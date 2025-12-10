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
import StatusCard from '../../components/Cards/StatusCard';
import SoilStatusCard from '../../components/Cards/SoilStatusCard';
import LightDurationCard from '../../components/Cards/LightDurationCard';
import VpdCard from '../../components/Cards/VpdCard';
import VpdStatusCard from '../../components/Cards/VpdStatusCard';
import SwitchableChartCard from '../../components/Cards/SwitchableChartCard';
import AiChatButton from '../../components/AiChat/AiChatButton';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { 
    sensorData, 
    luxHistory, 
    rpmHistory, 
    soilMoistureHistory,
    vpdHistory,
    lightDuration,
    soilStatus,
    pumpStatus,
    heaterStatus,
    vpdValue,
    plantInfo, 
    isLoading, 
    error, 
    isRealtimeConnected 
  } = useDashboard();

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
        <h1 className="dashboard-title">Growth Regulation & Optimized Box for Environmental Control</h1>
        <p className="dashboard-subtitle">Dashboard</p>
      </header> 

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        {/* Left Section - 1/3 */}
        <div className="left-section">
          <PlantInfo plantInfo={plantInfo} />
          <SoilStatusCard statusText={soilStatus} isConnected={isRealtimeConnected} />
          <LightDurationCard duration={lightDuration} isConnected={isRealtimeConnected} />
          <StatusCard title="Reservoir Pump Status" status={pumpStatus === 1 ? 'ON' : 'OFF'} isConnected={isRealtimeConnected} />
          <StatusCard title="Fan Heater Status" status={heaterStatus} isConnected={isRealtimeConnected} />
        </div>

        {/* Right Section - 2/3 */}
        <div className="right-section">
          <div className="cards-grid">
            {/* Row 1: Wind Speed, Light Intensity */}
            <WindSpeedCard value={sensorData.windSpeed} isConnected={isRealtimeConnected} />
            <LightIntensityCard value={sensorData.lightIntensity} isConnected={isRealtimeConnected} />
            
            {/* Row 2: Temperature, Air Humidity */}
            <TemperatureCard value={sensorData.temperature} isConnected={isRealtimeConnected} />
            <HumidityCard value={sensorData.airHumidity} isConnected={isRealtimeConnected} />
            
            {/* Row 3: VPD, VPD Status */}
            <VpdCard value={vpdValue} isConnected={isRealtimeConnected} />
            <VpdStatusCard vpdValue={vpdValue} isConnected={isRealtimeConnected} />
            
            {/* Row 4: Soil Moisture, Water Tank */}
            <SoilMoistureCard value={sensorData.soilMoisture} isConnected={isRealtimeConnected} />
            <WaterTankCard value={sensorData.waterTankLevel} isConnected={isRealtimeConnected} />
            
            {/* Row 5: Switchable Chart */}
            <SwitchableChartCard 
              rpmData={rpmHistory}
              luxData={luxHistory}
              soilMoistureData={soilMoistureHistory}
              vpdData={vpdHistory}
              isConnected={isRealtimeConnected}
            />
          </div>
        </div>
      </div>

      {/* AI Chat Button */}
      <AiChatButton />
    </div>
  );
};

export default DashboardPage;
