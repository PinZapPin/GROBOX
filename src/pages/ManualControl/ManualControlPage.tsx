import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { useDashboard } from '../../context/DashboardContext';
import { firebaseConfig } from '../../config/apiConfig';
import images from '../../assets/images';
import AiChatButton from '../../components/AiChat/AiChatButton';
import './ManualControlPage.css';

// Firebase config imported from secure apiConfig file

const app = initializeApp(firebaseConfig, 'manual-control-app');
const rtdb = getDatabase(app);

const ManualControlPage: React.FC = () => {
  // Get RPM data from DashboardContext
  const { rpmHistory } = useDashboard();
  
  const getIndividualFanRpms = (): { fan1: number; fan2: number; fan3: number; fan4: number } => {
    if (!rpmHistory || rpmHistory.length === 0) {
      return { fan1: 0, fan2: 0, fan3: 0, fan4: 0 };
    }
    const latestData = rpmHistory[rpmHistory.length - 1];
    return {
      fan1: Math.round(latestData.fan1),
      fan2: Math.round(latestData.fan2),
      fan3: Math.round(latestData.fan3),
      fan4: Math.round(latestData.fan4),
    };
  };

  const fanRpms = getIndividualFanRpms();

  // Fan Control State
  const [fanAutoMode, setFanAutoMode] = useState<boolean>(true);
  const [fanDuty, setFanDuty] = useState<number>(50);

  // Light Control State
  const [lightOn, setLightOn] = useState<boolean>(false);
  const [lightAutoMode, setLightAutoMode] = useState<boolean>(true);
  const [lightDuty, setLightDuty] = useState<number>(50);

  const handleSaveFan = async () => {
    try {
      await set(ref(rtdb, 'status/group30/autoControl'), fanAutoMode);
      if (!fanAutoMode) {
        await set(ref(rtdb, 'status/group30/duty'), fanDuty);
      }
      console.log('✓ Fan settings saved:', { autoControl: fanAutoMode, duty: fanDuty });
      alert('Fan settings saved to Firebase!');
    } catch (error) {
      console.error('❌ Error saving fan settings:', error);
      alert('Failed to save fan settings');
    }
  };

  const handleSaveLight = async () => {
    try {
      await set(ref(rtdb, 'status/group3/lampStatus'), lightOn);
      if (lightOn) {
        await set(ref(rtdb, 'status/group3/autoControl'), lightAutoMode);
        if (!lightAutoMode) {
          await set(ref(rtdb, 'status/group3/duty'), lightDuty);
        }
      }
      console.log('✓ Light settings saved:', { 
        lampStatus: lightOn, 
        autoControl: lightAutoMode, 
        duty: lightDuty 
      });
      alert('Light settings saved to Firebase!');
    } catch (error) {
      console.error('❌ Error saving light settings:', error);
      alert('Failed to save light settings');
    }
  };

  return (
    <div className="manual-control-page" style={{ backgroundImage: `url(${images.background})` }}>
      <header className="manual-control-header">
        <h1 className="manual-control-title">Growth Regulation & Optimized Box for Environmental Control</h1>
        <p className="manual-control-subtitle">Manual Control</p>
      </header>

      <div className="control-container">
        {/* Fan Control Card */}
        <div className="control-card">
          <div className="card-header-row">
            <div className="card-title-wrapper">
              <h2 className="card-title">Fan Control</h2>
              <div className="card-icon">
                <img src={images.frame.fanIcon} alt="Fan" />
              </div>
            </div>
            <div className="switch-container-right">
              <div className="mode-switch">
              <button
                className={`switch-option ${fanAutoMode ? 'active' : ''}`}
                onClick={() => setFanAutoMode(true)}
              >
                auto
              </button>
              <button
                className={`switch-option ${!fanAutoMode ? 'active' : ''}`}
                onClick={() => setFanAutoMode(false)}
              >
                manual
              </button>
              </div>
            </div>
          </div>

          <div className="card-center">
            <div className="four-fans-grid">
              {/* Fan 1 */}
              <div className="single-fan-display">
                <div className="fan-container spinning">
                  <div className="fan-blades-small">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="fan-blade-small"
                        style={{ 
                          transform: `rotate(${i * 51.43}deg)`
                        }}
                      />
                    ))}
                  </div>
                  <div className="fan-ring" />
                  <div className="fan-rpm-small">
                    <span className="rpm-value-small">{fanRpms.fan1}</span>
                  </div>
                </div>
                <span className="fan-label">Fan 1</span>
              </div>

              {/* Fan 2 */}
              <div className="single-fan-display">
                <div className="fan-container spinning">
                  <div className="fan-blades-small">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="fan-blade-small"
                        style={{ 
                          transform: `rotate(${i * 51.43}deg)`
                        }}
                      />
                    ))}
                  </div>
                  <div className="fan-ring" />
                  <div className="fan-rpm-small">
                    <span className="rpm-value-small">{fanRpms.fan2}</span>
                  </div>
                </div>
                <span className="fan-label">Fan 2</span>
              </div>

              {/* Fan 3 */}
              <div className="single-fan-display">
                <div className="fan-container spinning">
                  <div className="fan-blades-small">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="fan-blade-small"
                        style={{ 
                          transform: `rotate(${i * 51.43}deg)`
                        }}
                      />
                    ))}
                  </div>
                  <div className="fan-ring" />
                  <div className="fan-rpm-small">
                    <span className="rpm-value-small">{fanRpms.fan3}</span>
                  </div>
                </div>
                <span className="fan-label">Fan 3</span>
              </div>

              {/* Fan 4 */}
              <div className="single-fan-display">
                <div className="fan-container spinning">
                  <div className="fan-blades-small">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="fan-blade-small"
                        style={{ 
                          transform: `rotate(${i * 51.43}deg)`
                        }}
                      />
                    ))}
                  </div>
                  <div className="fan-ring" />
                  <div className="fan-rpm-small">
                    <span className="rpm-value-small">{fanRpms.fan4}</span>
                  </div>
                </div>
                <span className="fan-label">Fan 4</span>
              </div>
            </div>
          </div>

          <div className="card-controls">
            <div className="slider-section">
              <label className="slider-label">Duty 0% – 100%</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fanDuty}
                  onChange={(e) => setFanDuty(Number(e.target.value))}
                  className="duty-slider"
                  disabled={fanAutoMode}
                  style={{ opacity: fanAutoMode ? 0.4 : 1 }}
                />
                <span className="slider-value">{fanDuty}%</span>
              </div>
            </div>
            <button className="save-button-large" onClick={handleSaveFan}>
              Save
            </button>
          </div>
        </div>

        {/* Light Control Card */}
        <div className="control-card">
          <div className="card-header-row">
            <div className="card-title-wrapper">
              <h2 className="card-title">Light Control</h2>
              <div className="card-icon">
                <img src={images.frame.lightIcon} alt="Light" />
              </div>
            </div>
            
            <div className="switch-container-right">
              <div className="power-toggle-container">
                <div 
                  className={`power-toggle ${lightOn ? 'on' : 'off'}`}
                  onClick={() => setLightOn(!lightOn)}
                >
                  <div className="toggle-track">
                    <span className={`toggle-label-on ${lightOn ? 'active' : ''}`}>On</span>
                    <span className={`toggle-label-off ${!lightOn ? 'active' : ''}`}>Off</span>
                  </div>
                  <div className="toggle-thumb" />
                </div>
              </div>
              
              <div 
                className="mode-switch" 
                style={{ opacity: lightOn ? 1 : 0.4, pointerEvents: lightOn ? 'auto' : 'none' }}
              >
                <button
                  className={`switch-option ${lightAutoMode ? 'active' : ''}`}
                  onClick={() => setLightAutoMode(true)}
                  disabled={!lightOn}
                >
                  auto
                </button>
                <button
                  className={`switch-option ${!lightAutoMode ? 'active' : ''}`}
                  onClick={() => setLightAutoMode(false)}
                  disabled={!lightOn}
                >
                  manual
                </button>
              </div>
            </div>
          </div>

          <div className="card-center">
            <div 
              className="light-indicator"
              style={{ 
                backgroundColor: lightOn ? '#f4e04d' : '#d0d0d0',
                opacity: lightOn ? 1 : 0.5
              }}
            />
          </div>

          <div className="card-controls">
            <div className="slider-section">
              <label className="slider-label">PWM 0 – 255</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={lightDuty}
                  onChange={(e) => setLightDuty(Number(e.target.value))}
                  className="duty-slider"
                  disabled={!lightOn || lightAutoMode}
                  style={{ opacity: (!lightOn || lightAutoMode) ? 0.4 : 1 }}
                />
                <span className="slider-value">{lightDuty}</span>
              </div>
            </div>
            <button 
              className="save-button-large" 
              onClick={handleSaveLight}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat Button */}
      <AiChatButton />
    </div>
  );
};

export default ManualControlPage;
