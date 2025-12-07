import React from 'react';
import images from '../../assets/images';
import CircularGauge from './CircularGauge';

interface SoilMoistureCardProps {
  value: number;
  isConnected?: boolean;
}

const SoilMoistureCard: React.FC<SoilMoistureCardProps> = ({ value, isConnected = false }) => {
  return (
    <CircularGauge
      value={value}
      color="#6b8e23"
      title="Soil Moisture"
      iconSrc={images.frame.soilmoistureIcon}
      isConnected={isConnected}
    />
  );
};

export default SoilMoistureCard;
