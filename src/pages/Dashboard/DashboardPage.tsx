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
import VpdCard from '../../components/Cards/VpdCard';
import VpdStatusCard from '../../components/Cards/VpdStatusCard';
import SwitchableChartCard from '../../components/Cards/SwitchableChartCard';
import AiChatButton from '../../components/AiChat/AiChatButton';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { sensorData, luxHistory, rpmHistory, plantInfo, isLoading, error, isRealtimeConnected } = useDashboard();

  // Dummy states for new components - to be wired to Firebase later
  const [pumpStatus] = React.useState<'ON' | 'OFF'>('OFF');
  const [fanHeaterStatus] = React.useState<'ON' | 'OFF'>('OFF');
  const [vpdValue] = React.useState<number | null>(null); // Placeholder for VPD calculation
  const [soilStatusText] = React.useState<string>(''); // Placeholder for soil status from Firebase

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
          <SoilStatusCard statusText={soilStatusText} isConnected={isRealtimeConnected} />
          <StatusCard title="Pump Status" status={pumpStatus} isConnected={isRealtimeConnected} />
          <StatusCard title="Fan Heater Status" status={fanHeaterStatus} isConnected={isRealtimeConnected} />
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
