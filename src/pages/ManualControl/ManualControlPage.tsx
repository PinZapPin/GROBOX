import React, { useState } from 'react';
import './ManualControlPage.css';

const ManualControlPage: React.FC = () => {
  // Fan Control State
  const [fanMode, setFanMode] = useState<'auto' | 'manual'>('auto');
  const [fanDuty, setFanDuty] = useState(50);

  // Light Control State
  const [lightPower, setLightPower] = useState(false);
  const [lightAutoIntensity, setLightAutoIntensity] = useState(70);
  const [lightManualIntensity, setLightManualIntensity] = useState(50);

  const handleSaveFan = () => {
    console.log('Saving fan settings:', { fanMode, fanDuty });
    alert('Fan settings saved!');
  };

  const handleSaveLight = () => {
    console.log('Saving light settings:', { 
      lightPower, 
      lightAutoIntensity, 
      lightManualIntensity 
    });
    alert('Light settings saved!');
  };

  return (
    <div className="manual-control-page">
      <header className="page-header">
        <h1 className="page-title">Judul Proyek Ini</h1>
        <p className="page-subtitle">Manual Control</p>
      </header>

      <div className="control-container">
        {/* Fan Control Section */}
        <div className="control-section">
          <h2 className="section-title">Fan Control</h2>
          
          <div className="mode-selector">
            <button
              className={`mode-button ${fanMode === 'auto' ? 'active' : ''}`}
              onClick={() => setFanMode('auto')}
            >
              Auto Control
            </button>
            <button
              className={`mode-button ${fanMode === 'manual' ? 'active' : ''}`}
              onClick={() => setFanMode('manual')}
            >
              Manual Control
            </button>
          </div>

          <div className="control-item">
            <label className="control-label">Fan Duty Cycle (All Fans)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={fanDuty}
              onChange={(e) => setFanDuty(Number(e.target.value))}
              className="control-slider"
              disabled={fanMode === 'auto'}
            />
            <span className="control-value">{fanDuty}%</span>
          </div>

          <button className="save-button" onClick={handleSaveFan}>
            Save Fan Settings
          </button>
        </div>

        {/* Light Control Section */}
        <div className="control-section">
          <h2 className="section-title">Light Control</h2>
          
          <div className="toggle-item">
            <span className="toggle-label">Power</span>
            <button
              className={`toggle-button ${lightPower ? 'active' : ''}`}
              onClick={() => setLightPower(!lightPower)}
            >
              {lightPower ? 'ON' : 'OFF'}
            </button>
          </div>

          {lightPower && (
            <>
              <div className="control-item">
                <label className="control-label">Auto Mode Intensity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightAutoIntensity}
                  onChange={(e) => setLightAutoIntensity(Number(e.target.value))}
                  className="control-slider"
                />
                <span className="control-value">{lightAutoIntensity}%</span>
              </div>

              <div className="control-item">
                <label className="control-label">Manual Mode Intensity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightManualIntensity}
                  onChange={(e) => setLightManualIntensity(Number(e.target.value))}
                  className="control-slider"
                />
                <span className="control-value">{lightManualIntensity}%</span>
              </div>
            </>
          )}

          <button className="save-button" onClick={handleSaveLight}>
            Save Light Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualControlPage;
