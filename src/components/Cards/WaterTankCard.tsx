import React from 'react';
import images from '../../assets/images';
import './WaterTankCard.css';

interface WaterTankCardProps {
  value: number; // 0-100
  isConnected?: boolean;
}

const WaterTankCard: React.FC<WaterTankCardProps> = ({ value, isConnected = false }) => {
  const [scale, setScale] = React.useState(1);

  // Reset scale to 1.0 when window resizes
  React.useEffect(() => {
    const handleResize = () => {
      setScale(1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="water-tank-card sensor-card">
      <div className="gauge-header">
        <h3 className="gauge-title">Water Tank</h3>
        <div className="gauge-icon">
          <img src={images.frame.watercapIcon} alt="Water Tank" />
        </div>
      </div>
      {isConnected ? (
        <div className="tank-container" style={{ transform: `scale(${scale})` }}>
          <div className="tank-outline">
            <div 
              className="tank-fill"
              style={{ height: `${Math.min(Math.max(value, 0), 100)}%` }}
            >
              <div className="water-wave"></div>
            </div>
            <div className="tank-percentage">{Math.round(value)}%</div>
          </div>
        </div>
      ) : (
        <div className="tank-fallback">
          <span className="card-fallback">Belum terhubung ke Firebase</span>
        </div>
      )}
    </div>
  );
};

export default WaterTankCard;
