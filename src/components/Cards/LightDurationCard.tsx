import React from 'react';
import images from '../../assets/images';
import './StatusCard.css';

interface LightDurationCardProps {
  duration: string;
  isConnected?: boolean;
}

const LightDurationCard: React.FC<LightDurationCardProps> = ({ duration, isConnected = true }) => {
  return (
    <div className="status-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">Light Duration</h3>
        <div className="card-icon">
          <img src={images.frame.lightIcon} alt="Light" />
        </div>
      </div>
      <div className="status-content">
        {!isConnected ? (
          <div className="status-no-data">
            <span>(No Data)</span>
          </div>
        ) : (
          <div className="status-text-display">
            <span className="duration-text">{duration || '0h 0m'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightDurationCard;
