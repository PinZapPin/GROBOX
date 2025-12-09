import React from 'react';
import images from '../../assets/images';
import './WaterTankCard.css';

interface WaterTankCardProps {
  value: number; // 0-100
  isConnected?: boolean;
}

const WaterTankCard: React.FC<WaterTankCardProps> = ({ value, isConnected = false }) => {
  const [scale, setScale] = React.useState(1);
  const [animatedValue, setAnimatedValue] = React.useState(0);

  // Entrance animation for water fill
  React.useEffect(() => {
    if (isConnected && value > 0) {
      const duration = 1000; // 1 second
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setAnimatedValue(value * progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setAnimatedValue(value);
    }
  }, [value, isConnected]);

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
              style={{ height: `${Math.min(Math.max(animatedValue, 0), 100)}%` }}
            >
              <div className="water-wave"></div>
            </div>
            <div className="tank-percentage">{Math.round(value)}%</div>
          </div>
        </div>
      ) : (
        <div className="tank-no-data">
          <span>(No Data)</span>
        </div>
      )}
    </div>
  );
};

export default WaterTankCard;
