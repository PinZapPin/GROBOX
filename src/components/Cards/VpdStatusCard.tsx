import React from 'react';
import images from '../../assets/images';
import './VpdStatusCard.css';

interface VpdStatusCardProps {
  vpdValue: string;
  isConnected?: boolean;
}

const VpdStatusCard: React.FC<VpdStatusCardProps> = ({ vpdValue, isConnected = false }) => {
  const getActiveStatus = (): 'low' | 'optimal' | 'high' | null => {
    if (!isConnected || !vpdValue) return null;
    
    const numericValue = parseFloat(vpdValue);
    if (isNaN(numericValue)) return null;
    
    if (numericValue < 0.8) return 'low';
    if (numericValue >= 0.8 && numericValue <= 1.2) return 'optimal';
    return 'high';
  };

  const activeStatus = getActiveStatus();

  return (
    <div className="vpd-status-card sensor-card">
      <div className="card-header">
        <h3 className="card-title">VPD Status</h3>
        <div className="card-icon">
          <img src={images.frame.vpdIcon} alt="VPD" />
        </div>
      </div>
      <div className="vpd-status-indicators">
        {isConnected && vpdValue ? (
          <>
            <div className={`vpd-indicator low ${activeStatus === 'low' ? 'active' : ''}`}>
            </div>
            <div className={`vpd-indicator optimal ${activeStatus === 'optimal' ? 'active' : ''}`}>
            </div>
            <div className={`vpd-indicator high ${activeStatus === 'high' ? 'active' : ''}`}>
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
