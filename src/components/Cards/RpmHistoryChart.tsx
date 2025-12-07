import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RpmDataPoint } from '../../services/dummyData';
import './RpmHistoryChart.css';

interface RpmHistoryChartProps {
  data: RpmDataPoint[];
  isLoading?: boolean;
  error?: string | null;
}

const RpmHistoryChart: React.FC<RpmHistoryChartProps> = ({ data, isLoading, error }) => {
  const [enableAnimation, setEnableAnimation] = React.useState(true);
  const [chartKey, setChartKey] = React.useState(0);

  const animationTimerRef = React.useRef<number | null>(null);
  const resizeTimerRef = React.useRef<number | null>(null);

  const startAnimationOnce = React.useCallback(() => {
    if (data.length === 0) return;

    setEnableAnimation(true);

    if (animationTimerRef.current !== null) {
      window.clearTimeout(animationTimerRef.current);
    }

    animationTimerRef.current = window.setTimeout(() => {
      setEnableAnimation(false);
    }, 1500 + 100); // durasi animasi + buffer
  }, [data.length]);

  // Animasi pertama kali saat data masuk
  React.useEffect(() => {
    if (data.length > 0) {
      startAnimationOnce();
    }
  }, [data.length, startAnimationOnce]);

  // Animasi setelah window resize "settle"
  React.useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
      }

      // Debounce: tunggu 300 ms setelah user berhenti resize
      resizeTimerRef.current = window.setTimeout(() => {
        if (data.length > 0) {
          setChartKey(prev => prev + 1); // force redraw chart
          startAnimationOnce();
        }
      }, 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
      }
      if (animationTimerRef.current !== null) {
        window.clearTimeout(animationTimerRef.current);
      }
    };
  }, [data.length, startAnimationOnce]);

  return (
    <div className="rpm-history-chart sensor-card">
      <div className="card-header">
        <h3 className="card-title">Fan RPM History</h3>
        <div className="card-icon">
          <img src="/assets/frame/fanIcon.png" alt="Fan" />
        </div>
      </div>
      
      {isLoading && (
        <div className="chart-status">
          <p className="status-message loading">Connecting to Firebase...</p>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="chart-status">
          <p className="status-message error">{error}</p>
        </div>
      )}
      
      {!isLoading && !error && data.length === 0 && (
        <div className="chart-status">
          <p className="status-message empty">Waiting for data...</p>
        </div>
      )}
      
      {!isLoading && !error && data.length > 0 && (
        <>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#e74c3c' }}></div>
              <span className="legend-label">Fan 1</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#3498db' }}></div>
              <span className="legend-label">Fan 2</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div>
              <span className="legend-label">Fan 3</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#f39c12' }}></div>
              <span className="legend-label">Fan 4</span>
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
                  animationDuration={200}
                />
                <Line 
                  type="monotone" 
                  dataKey="fan1" 
                  stroke="#e74c3c" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={enableAnimation}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Line 
                  type="monotone" 
                  dataKey="fan2" 
                  stroke="#3498db" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={enableAnimation}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Line 
                  type="monotone" 
                  dataKey="fan3" 
                  stroke="#2ecc71" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={enableAnimation}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Line 
                  type="monotone" 
                  dataKey="fan4" 
                  stroke="#f39c12" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={enableAnimation}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default RpmHistoryChart;
