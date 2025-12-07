import React from 'react';
import './LightIntensityCard.css';

interface LightIntensityCardProps {
  value: number; // lux
}

const LightIntensityCard: React.FC<LightIntensityCardProps> = ({ value }) => {
  return (
    <div className="light-intensity-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">Light Intensity</h3>
        <div className="card-icon">
          <img src="/assets/frame/lightIcon.png" alt="Light" />
        </div>
      </div>
      <div className="card-value-container">
        <span className="card-value">{value.toLocaleString()}</span>
        <span className="card-unit">lux</span>
      </div>
    </div>
  );
};

export default LightIntensityCard;
