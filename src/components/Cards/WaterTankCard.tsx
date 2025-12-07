import React from 'react';
import './WaterTankCard.css';

interface WaterTankCardProps {
  value: number; // 0-100
}

const WaterTankCard: React.FC<WaterTankCardProps> = ({ value }) => {
  return (
    <div className="water-tank-card sensor-card">
      <div className="gauge-header">
        <h3 className="gauge-title">Water Tank</h3>
        <div className="gauge-icon">
          <img src="/assets/frame/watercapIcon.png" alt="Water Tank" />
        </div>
      </div>
      <div className="tank-container">
        <div className="tank-outline">
          <div 
            className="tank-fill"
            style={{ height: `${value}%` }}
          >
            <div className="water-wave"></div>
          </div>
          <div className="tank-percentage">{value}%</div>
        </div>
      </div>
    </div>
  );
};

export default WaterTankCard;
