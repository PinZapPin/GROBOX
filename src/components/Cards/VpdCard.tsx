import React from 'react';
import images from '../../assets/images';
import './VpdCard.css';

interface VpdCardProps {
  value: string;
  isConnected?: boolean;
}

const VpdCard: React.FC<VpdCardProps> = ({ value, isConnected = false }) => {
  const numericValue = value ? parseFloat(value) : null;
  
  return (
    <div className="vpd-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">Vapor Pressure Deficit</h3>
        <div className="card-icon">
          <img src={images.frame.vpdIcon} alt="VPD" />
        </div>
      </div>
      <div className="card-value-container">
        {isConnected && numericValue !== null ? (
          <>
            <span className="card-value">{numericValue.toFixed(2)}</span>
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
