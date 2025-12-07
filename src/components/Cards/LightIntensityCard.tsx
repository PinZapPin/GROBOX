import React from 'react';
import images from '../../assets/images';
import './LightIntensityCard.css';

interface LightIntensityCardProps {
  value: number; // lux
  isConnected?: boolean;
}

const LightIntensityCard: React.FC<LightIntensityCardProps> = ({ value, isConnected = false }) => {
  return (
    <div className="light-intensity-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">Light Intensity</h3>
        <div className="card-icon">
          <img src={images.frame.lightIcon} alt="Light" />
        </div>
      </div>
      <div className="card-value-container">
        {isConnected ? (
          <>
            <span className="card-value">{value.toLocaleString()}</span>
            <span className="card-unit">lux</span>
          </>
        ) : (
          <span className="card-fallback">Belum terhubung ke Firebase</span>
        )}
      </div>
    </div>
  );
};

export default LightIntensityCard;
