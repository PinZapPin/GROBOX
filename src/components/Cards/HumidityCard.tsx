import React from 'react';
import images from '../../assets/images';
import CircularGauge from './CircularGauge';

interface HumidityCardProps {
  value: number;
  isConnected?: boolean;
}

const HumidityCard: React.FC<HumidityCardProps> = ({ value, isConnected = false }) => {
  return (
    <CircularGauge
      value={value}
      color="#3498db"
      title="Air Humidity"
      iconSrc={images.frame.humidityIcon}
      isConnected={isConnected}
    />
  );
};

export default HumidityCard;
