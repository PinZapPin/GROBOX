import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LuxDataPoint } from '../../services/dummyData';
import images from '../../assets/images';
import './LuxHistoryChart.css';

interface LuxHistoryChartProps {
  data: LuxDataPoint[];
}

const LuxHistoryChart: React.FC<LuxHistoryChartProps> = ({ data }) => {
  const [enableAnimation, setEnableAnimation] = useState(true);
  const [chartKey, setChartKey] = useState(0);

  /**
   * Re-trigger animation saat data berubah
   */
  useEffect(() => {
    if (data.length > 0) {
      setEnableAnimation(true);
      setChartKey(prev => prev + 1);
    }
  }, [data]);

  /**
   * Re-trigger animation saat window resize (debounced 300ms)
   */
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setEnableAnimation(true);
        setChartKey(prev => prev + 1);
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="lux-history-chart sensor-card">
      <div className="card-header">
        <h3 className="card-title">Light Intensity History</h3>
        <div className="card-icon">
          <img src={images.frame.lightIcon} alt="Chart" />
        </div>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ffd54f' }}></div>
          <span className="legend-label">Lux</span>
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            key={chartKey}
            data={data} 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              stroke="#7f8c8d"
              style={{ fontSize: '12px', fontFamily: 'Poppins' }}
            />
            <YAxis 
              stroke="#7f8c8d"
              style={{ fontSize: '12px', fontFamily: 'Poppins' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontFamily: 'Poppins',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="lux" 
              stroke="#ffd54f" 
              strokeWidth={3}
              dot= {false}
              isAnimationActive={enableAnimation}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LuxHistoryChart;
