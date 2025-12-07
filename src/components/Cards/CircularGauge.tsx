import React from 'react';
import './CircularGauge.css';

interface CircularGaugeProps {
  value: number;
  maxValue?: number;
  color: string;
  title: string;
  iconSrc?: string;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  maxValue = 100,
  color,
  title,
  iconSrc,
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  // Animasi angka dan arc setiap kali value berubah
  React.useEffect(() => {
    const duration = 800; // ms
    const start = displayValue;
    const end = value;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = start + (end - start) * progress;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const percentage = (displayValue / maxValue) * 100;
  const radius = 45;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="circular-gauge-card sensor-card">
      <div className="gauge-header">
        <h3 className="gauge-title">{title}</h3>
        {iconSrc && (
          <div className="gauge-icon">
            <img src={iconSrc} alt={title} />
          </div>
        )}
      </div>
      <div className="gauge-container">
        <svg width="80" height="80" viewBox="0 0 120 120" className="gauge-svg">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
            className="gauge-progress"
          />
        </svg>
        <div className="gauge-value">
          <span className="gauge-percentage">{Math.round(displayValue)}</span>
          <span className="gauge-unit">%</span>
        </div>
      </div>
    </div>
  );
};

export default CircularGauge;
