import React from 'react';
import './VpdCard.css';

interface VpdCardProps {
  value: number | null;
  isConnected?: boolean;
}

const VpdCard: React.FC<VpdCardProps> = ({ value, isConnected = false }) => {
  return (
    <div className="vpd-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">Vapor Pressure Deficit </h3>
        <div className="card-icon vpd-icon">
          {/* Placeholder icon - user will replace later */}
          <div className="placeholder-icon"></div>
        </div>
      </div>
      <div className="card-value-container">
        {isConnected && value !== null ? (
          <>
            <span className="card-value">{value.toFixed(2)}</span>
            <span className="card-unit">kPa</span>
          </>
        ) : (
          <span className="card-no-data">(No Data)</span>
        )}
      </div>
    </div>
  );
};

export default VpdCard;
