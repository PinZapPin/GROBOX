import React from 'react';
import images from '../../assets/images';
import CircularGauge from './CircularGauge';

interface HumidityCardProps {
  value: number;
}

const HumidityCard: React.FC<HumidityCardProps> = ({ value }) => {
  return (
    <CircularGauge
      value={value}
      color="#3498db"
      title="Air Humidity"
      iconSrc={images.frame.humidityIcon}
    />
  );
};

export default HumidityCard;
