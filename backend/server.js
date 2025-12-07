import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock data - nantinya bisa diganti dengan Firebase
const sensorData = {
  temperature: 26.5,
  windSpeed: 2.3,
  airHumidity: 65,
  soilMoisture: 72,
  waterTankLevel: 85,
  lightIntensity: 1250,
};

const historicalLux = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  lux: Math.floor(Math.random() * 2000 + 500),
}));

const historicalRpm = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  fan1: Math.floor(Math.random() * 500 + 1000),
  fan2: Math.floor(Math.random() * 500 + 1200),
  fan3: Math.floor(Math.random() * 500 + 1100),
  fan4: Math.floor(Math.random() * 500 + 1300),
}));

// API Routes
app.get('/api/sensors/current', (req, res) => {
  res.json({
    success: true,
    data: sensorData,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/sensors/history/lux', (req, res) => {
  res.json({
    success: true,
    data: historicalLux,
  });
});

app.get('/api/sensors/history/rpm', (req, res) => {
  res.json({
    success: true,
    data: historicalRpm,
  });
});

app.get('/api/plant-info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Dieffenbachia',
      scientificName: 'Dieffenbachia seguine',
      description: 'Tanaman hias tropis dengan daun hijau bermotif putih-kuning',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
