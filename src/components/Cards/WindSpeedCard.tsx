import React from 'react';
import images from '../../assets/images';
import './WindSpeedCard.css';

interface WindSpeedCardProps {
  value: number;
}

const WindSpeedCard: React.FC<WindSpeedCardProps> = ({ value }) => {
  return (
    <div className="wind-speed-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">Wind Speed</h3>
        <div className="card-icon">
          <img src={images.frame.windIcon} alt="Wind" />
        </div>
      </div>
      <div className="card-value-container">
        <span className="card-value">{value.toFixed(1)}</span>
        <span className="card-unit">m/s</span>
      </div>
      <div className="wind-lines"></div>
    </div>
  );
};

export default WindSpeedCard;
