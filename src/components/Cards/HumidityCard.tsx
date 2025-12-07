import React from 'react';
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
      iconSrc="/assets/frame/humidityIcon.png"
    />
  );
};

export default HumidityCard;
