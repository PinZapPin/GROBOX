import React from 'react';
import './StatusCard.css';

interface StatusCardProps {
  title: string;
  status: 'ON' | 'OFF';
  isConnected?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, status, isConnected = false }) => {
  return (
    <div className="status-card">
      <h3 className="status-card-title">{title}</h3>
      <div className="status-value-container">
        {isConnected ? (
          <span className={`status-value ${status.toLowerCase()}`}>{status}</span>
        ) : (
          <span className="status-no-data">(No Data)</span>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
