import React from 'react';
import './VpdStatusCard.css';

interface VpdStatusCardProps {
  vpdValue: number | null;
  isConnected?: boolean;
}

const VpdStatusCard: React.FC<VpdStatusCardProps> = ({ vpdValue, isConnected = false }) => {
  const getActiveStatus = (): 'low' | 'optimal' | 'high' | null => {
    if (!isConnected || vpdValue === null) return null;
    if (vpdValue < 0.8) return 'low';
    if (vpdValue <= 1.2) return 'optimal';
    return 'high';
  };

  const activeStatus = getActiveStatus();

  return (
    <div className="vpd-status-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">VPD Status</h3>
      </div>
      <div className="vpd-status-indicators">
        {isConnected && vpdValue !== null ? (
          <>
            <div className={`vpd-indicator low ${activeStatus === 'low' ? 'active' : ''}`}>
              <span className="indicator-label">Low</span>
            </div>
            <div className={`vpd-indicator optimal ${activeStatus === 'optimal' ? 'active' : ''}`}>
              <span className="indicator-label">Optimal</span>
            </div>
            <div className={`vpd-indicator high ${activeStatus === 'high' ? 'active' : ''}`}>
              <span className="indicator-label">High</span>
            </div>
          </>
        ) : (
          <div className="vpd-no-data">(No Data)</div>
        )}
      </div>
    </div>
  );
};

export default VpdStatusCard;
