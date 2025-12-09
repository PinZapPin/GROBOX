import React from 'react';
import './SoilStatusCard.css';

interface SoilStatusCardProps {
  statusText: string;
  isConnected?: boolean;
}

const SoilStatusCard: React.FC<SoilStatusCardProps> = ({ statusText, isConnected = false }) => {
  return (
    <div className="soil-status-card">
      <h3 className="soil-status-title">Soil Status</h3>
      <div className="soil-status-content">
        {isConnected && statusText ? (
          <p className="soil-status-text">{statusText}</p>
        ) : (
          <span className="soil-status-no-data">(No Data)</span>
        )}
      </div>
    </div>
  );
};

export default SoilStatusCard;
