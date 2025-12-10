// Data dummy yang bisa langsung diganti dengan Firebase
// Semua data ini akan di-manage oleh Context dan bisa di-update dari Firebase Realtime Database atau Firestore

export interface SensorData {
  temperature: number;
  windSpeed: number;
  airHumidity: number;
  soilMoisture: number;
  waterTankLevel: number;
  lightIntensity: number;
}

export interface LuxDataPoint {
  time: string;
  lux: number;
}

export interface RpmDataPoint {
  time: string;
  fan1: number;
  fan2: number;
  fan3: number;
  fan4: number;
}

export interface SoilMoistureDataPoint {
  time: string;
  soilMoisture: number;
}

export interface VpdDataPoint {
  time: string;
  vpd: number;
}

export interface PlantInfo {
  name: string;
  scientificName: string;
  description: string;
}

// Default dummy data
export const defaultSensorData: SensorData = {
  temperature: 26.5,
  windSpeed: 2.3,
  airHumidity: 65,
  soilMoisture: 72,
  waterTankLevel: 85,
  lightIntensity: 1250,
};

export const defaultLuxHistory: LuxDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  lux: Math.floor(Math.random() * 2000 + 500),
}));

export const defaultPlantInfo: PlantInfo = {
  name: 'Dieffenbachia',
  scientificName: 'Dieffenbachia seguine',
  description: 'Tanaman hias tropis dengan daun hijau bermotif putih-kuning',
};
