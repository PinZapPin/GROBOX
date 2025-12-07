import React from 'react';
import images from '../../assets/images';
import './TemperatureCard.css';

interface TemperatureCardProps {
  value: number;
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ value }) => {
  return (
    <div className="temperature-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">Temperature</h3>
        <div className="card-icon">
          <img src={images.frame.tempIcon} alt="Temperature" />
        </div>
      </div>
      <div className="card-value-container">
        <span className="card-value">{value.toFixed(1)}</span>
        <span className="card-unit">°C</span>
      </div>
    </div>
  );
};

export default TemperatureCard;
