import React from 'react';
import CircularGauge from './CircularGauge';

interface SoilMoistureCardProps {
  value: number;
}

const SoilMoistureCard: React.FC<SoilMoistureCardProps> = ({ value }) => {
  return (
    <CircularGauge
      value={value}
      color="#6b8e23"
      title="Soil Moisture"
      iconSrc="/assets/frame/soilmoistureIcon.png"
    />
  );
};

export default SoilMoistureCard;
