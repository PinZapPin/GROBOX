/**
 * ============================================================================
 * DASHBOARD CONTEXT - UPDATED VERSION WITH ALL GROUPS
 * ============================================================================
 * 
 * This file controls all Firebase Firestore & Realtime Database data streams
 * for the dashboard. All data fetching, parsing, and distribution happens here.
 * 
 * GROUPS COVERED:
 * - Group 3: Light control and monitoring
 * - Group 12: Soil sensors and pump
 * - Group 30: Fan/ventilation control
 * - Group 6&35: VPD and heater
 * 
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { getDatabase, ref, onValue, off, DatabaseReference } from 'firebase/database';
import { plantService } from '../services/api.service';
import { firebaseConfig } from '../config/apiConfig';
import {
  SensorData,
  LuxDataPoint,
  RpmDataPoint,
  SoilMoistureDataPoint,
  VpdDataPoint,
  PlantInfo,
  defaultSensorData,
  defaultPlantInfo,
} from '../services/dummyData';

// ============================================================================
// FIREBASE INITIALIZATION
// ============================================================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);

// ============================================================================
// DATA PROCESSING FUNCTIONS
// ============================================================================

/**
 * Format timestamp from MM-DD-YY_HH-MM-SS to HH:MM:SS
 */
const formatTimestamp = (timestamp: string): string => {
  try {
    if (timestamp.includes('_')) {
      const timePart = timestamp.split('_')[1];
      return timePart ? timePart.replace(/-/g, ':') : timestamp;
    }
    return timestamp;
  } catch (error) {
    console.error('Format timestamp error:', error);
    return timestamp;
  }
};

/**
 * Parse Firestore data for RPM (Group 30)
 */
const parseRpmData = (docData: any): RpmDataPoint | null => {
  try {
    const rpm1 = docData.rpm1?.integerValue ? parseInt(docData.rpm1.integerValue) : docData.rpm1 || 0;
    const rpm2 = docData.rpm2?.integerValue ? parseInt(docData.rpm2.integerValue) : docData.rpm2 || 0;
    const rpm3 = docData.rpm3?.integerValue ? parseInt(docData.rpm3.integerValue) : docData.rpm3 || 0;
    const rpm4 = docData.rpm4?.integerValue ? parseInt(docData.rpm4.integerValue) : docData.rpm4 || 0;
    const timestamp = docData.timestamp?.stringValue || docData.timestamp || '';

    return {
      time: formatTimestamp(timestamp),
      fan1: rpm1,
      fan2: rpm2,
      fan3: rpm3,
      fan4: rpm4,
    };
  } catch (error) {
    console.error('Parse RPM error:', error);
    return null;
  }
};

/**
 * Parse Firestore data for Light Intensity (Group 3)
 */
const parseLightData = (docData: any): LuxDataPoint | null => {
  try {
    const lux = docData.lightIntensity?.integerValue
      ? parseInt(docData.lightIntensity.integerValue)
      : docData.lightIntensity || 0;
    const timestamp = docData.timestamp?.stringValue || docData.timestamp || '';

    return {
      time: formatTimestamp(timestamp),
      lux: lux,
    };
  } catch (error) {
    console.error('Parse Light error:', error);
    return null;
  }
};

/**
 * Parse Firestore data for Soil Moisture (Group 12)
 */
const parseSoilMoistureData = (docData: any): SoilMoistureDataPoint | null => {
  try {
    const soilMoisture = docData.soilMoisture?.integerValue
      ? parseInt(docData.soilMoisture.integerValue)
      : docData.soilMoisture || 0;
    const timestamp = docData.timestamp?.stringValue || docData.timestamp || '';

    return {
      time: formatTimestamp(timestamp),
      soilMoisture: soilMoisture,
    };
  } catch (error) {
    console.error('Parse Soil Moisture error:', error);
    return null;
  }
};

/**
 * Parse Firestore data for VPD (Group 6&35)
 */
const parseVpdData = (docData: any): VpdDataPoint | null => {
  try {
    const vpd = docData.vpd?.doubleValue
      ? parseFloat(docData.vpd.doubleValue)
      : docData.vpd || 0;
    const timestamp = docData.timestamp?.stringValue || docData.timestamp || '';

    return {
      time: formatTimestamp(timestamp),
      vpd: vpd,
    };
  } catch (error) {
    console.error('Parse VPD error:', error);
    return null;
  }
};

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================

interface DashboardContextType {
  // Sensor data from RTDB
  sensorData: SensorData;
  
  // Historical data from Firestore
  luxHistory: LuxDataPoint[];
  rpmHistory: RpmDataPoint[];
  soilMoistureHistory: SoilMoistureDataPoint[];
  vpdHistory: VpdDataPoint[];
  
  // Status data from RTDB
  lightDuration: string;
  soilStatus: string;
  pumpStatus: number; // 0 or 1
  heaterStatus: string; // "ON" or "OFF"
  vpdValue: string; // string from RTDB
  
  plantInfo: PlantInfo;
  isLoading: boolean;
  error: string | null;
  isRealtimeConnected: boolean;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

// ============================================================================
// DASHBOARD PROVIDER
// ============================================================================

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  // State for sensor readings
  const [sensorData, setSensorData] = useState<SensorData>(defaultSensorData);
  
  // State for historical data
  const [luxHistory, setLuxHistory] = useState<LuxDataPoint[]>([]);
  const [rpmHistory, setRpmHistory] = useState<RpmDataPoint[]>([]);
  const [soilMoistureHistory, setSoilMoistureHistory] = useState<SoilMoistureDataPoint[]>([]);
  const [vpdHistory, setVpdHistory] = useState<VpdDataPoint[]>([]);
  
  // State for status data
  const [lightDuration, setLightDuration] = useState<string>('');
  const [soilStatus, setSoilStatus] = useState<string>('');
  const [pumpStatus, setPumpStatus] = useState<number>(0);
  const [heaterStatus, setHeaterStatus] = useState<string>('OFF');
  const [vpdValue, setVpdValue] = useState<string>('0');
  
  const [plantInfo, setPlantInfo] = useState<PlantInfo>(defaultPlantInfo);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState<boolean>(false);

  // ============================================================================
  // REALTIME DATABASE LISTENERS
  // ============================================================================

  useEffect(() => {
    const realtimeRefs: DatabaseReference[] = [];

    try {
      // GROUP 3: Light Intensity (lux)
      const luxRef = ref(rtdb, 'status/group3/lux');
      realtimeRefs.push(luxRef);
      onValue(luxRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setSensorData((prev) => ({ ...prev, lightIntensity: Number(value) }));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Light Intensity:', value);
        }
      });

      // GROUP 12: Soil Status
      const soilStatusRef = ref(rtdb, 'status/group12/soilStatus');
      realtimeRefs.push(soilStatusRef);
      onValue(soilStatusRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setSoilStatus(String(value));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Soil Status:', value);
        }
      });

      // GROUP 12: Pump Status
      const pumpStatusRef = ref(rtdb, 'status/group12/pumpStatus');
      realtimeRefs.push(pumpStatusRef);
      onValue(pumpStatusRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setPumpStatus(Number(value));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Pump Status:', value);
        }
      });

      // GROUP 12: Soil Moisture
      const soilRef = ref(rtdb, 'status/group12/soilMoisture');
      realtimeRefs.push(soilRef);
      onValue(soilRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setSensorData((prev) => ({ ...prev, soilMoisture: Number(value) }));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Soil Moisture:', value);
        }
      });

      // GROUP 12: Water Tank
      const waterRef = ref(rtdb, 'status/group12/waterTank');
      realtimeRefs.push(waterRef);
      onValue(waterRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setSensorData((prev) => ({ ...prev, waterTankLevel: Number(value) }));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Water Tank:', value);
        }
      });

      // GROUP 30: Wind Speed
      const windRef = ref(rtdb, 'status/group30/windSpeed');
      realtimeRefs.push(windRef);
      onValue(windRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setSensorData((prev) => ({ ...prev, windSpeed: Number(value) }));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Wind Speed:', value);
        }
      });

      // GROUP 6&35: Temperature
      const tempRef = ref(rtdb, 'status/group6&35/temperature');
      realtimeRefs.push(tempRef);
      onValue(tempRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setSensorData((prev) => ({ ...prev, temperature: Number(value) }));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Temperature:', value);
        }
      });

      // GROUP 6&35: Humidity
      const humidityRef = ref(rtdb, 'status/group6&35/humidity');
      realtimeRefs.push(humidityRef);
      onValue(humidityRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setSensorData((prev) => ({ ...prev, airHumidity: Number(value) }));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Air Humidity:', value);
        }
      });

      // GROUP 6&35: Heater Status
      const heaterRef = ref(rtdb, 'status/group6&35/heater');
      realtimeRefs.push(heaterRef);
      onValue(heaterRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setHeaterStatus(String(value));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB Heater Status:', value);
        }
      });

      // GROUP 6&35: VPD Value
      const vpdRef = ref(rtdb, 'status/group6&35/vpd');
      realtimeRefs.push(vpdRef);
      onValue(vpdRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setVpdValue(String(value));
          setIsRealtimeConnected(true);
          console.log('✓ RTDB VPD:', value);
        }
      });

      console.log('✓ Firebase Realtime Database listeners initialized');
    } catch (err) {
      console.error('❌ RTDB setup error:', err);
      setError('Gagal setup Realtime Database');
    }

    return () => {
      realtimeRefs.forEach((dbRef) => {
        off(dbRef);
      });
      console.log('🔌 RTDB listeners detached');
    };
  }, []);

  // ============================================================================
  // FIRESTORE LISTENERS
  // ============================================================================

  // GROUP 3: Light Intensity History
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const sensorDataRef = collection(db, 'growthChamber', 'group3', 'sensorData');
      const q = query(sensorDataRef, orderBy('timestamp', 'desc'), limit(20));

      unsubscribe = onSnapshot(q, { includeMetadataChanges: false }, (snapshot) => {
        const parsedData: LuxDataPoint[] = [];
        snapshot.forEach((doc) => {
          const parsed = parseLightData(doc.data());
          if (parsed) {
            parsedData.push(parsed);
          }
        });

        if (parsedData.length > 0) {
          const sortedAscending = parsedData.slice().reverse();
          setLuxHistory(sortedAscending);
          console.log('✓ Light History updated:', sortedAscending.length, 'entries');
        }
      });
    } catch (err) {
      console.error('❌ Firestore Light setup error:', err);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // GROUP 3: Light Duration (get latest document)
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const sensorDataRef = collection(db, 'growthChamber', 'group3', 'sensorData');
      const q = query(sensorDataRef, orderBy('timestamp', 'desc'), limit(1));

      unsubscribe = onSnapshot(q, { includeMetadataChanges: false }, (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const duration = data.onDuration?.stringValue || data.onDuration || '';
          setLightDuration(String(duration));
          console.log('✓ Light Duration:', duration);
        });
      });
    } catch (err) {
      console.error('❌ Firestore Light Duration setup error:', err);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // GROUP 12: Soil Moisture History
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const sensorDataRef = collection(db, 'growthChamber', 'group12', 'sensorData');
      const q = query(sensorDataRef, orderBy('timestamp', 'desc'), limit(20));

      unsubscribe = onSnapshot(q, { includeMetadataChanges: false }, (snapshot) => {
        const parsedData: SoilMoistureDataPoint[] = [];
        snapshot.forEach((doc) => {
          const parsed = parseSoilMoistureData(doc.data());
          if (parsed) {
            parsedData.push(parsed);
          }
        });

        if (parsedData.length > 0) {
          const sortedAscending = parsedData.slice().reverse();
          setSoilMoistureHistory(sortedAscending);
          console.log('✓ Soil Moisture History updated:', sortedAscending.length, 'entries');
        }
      });
    } catch (err) {
      console.error('❌ Firestore Soil Moisture setup error:', err);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // GROUP 30: RPM History
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const sensorDataRef = collection(db, 'growthChamber', 'group30', 'sensorData');
      const q = query(sensorDataRef, orderBy('timestamp', 'desc'), limit(20));

      unsubscribe = onSnapshot(q, { includeMetadataChanges: false }, (snapshot) => {
        const parsedData: RpmDataPoint[] = [];
        snapshot.forEach((doc) => {
          const parsed = parseRpmData(doc.data());
          if (parsed) {
            parsedData.push(parsed);
          }
        });

        if (parsedData.length > 0) {
          const sortedAscending = parsedData.slice().reverse();
          setRpmHistory(sortedAscending);
          console.log('✓ RPM History updated:', sortedAscending.length, 'entries');
          setError(null);
        }

        setIsLoading(false);
      });
    } catch (err) {
      console.error('❌ Firestore RPM setup error:', err);
      setError('Gagal setup RPM realtime listener');
      setIsLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // GROUP 6&35: VPD History
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const sensorDataRef = collection(db, 'growthChamber', 'group6&35', 'sensorData');
      const q = query(sensorDataRef, orderBy('timestamp', 'desc'), limit(20));

      unsubscribe = onSnapshot(q, { includeMetadataChanges: false }, (snapshot) => {
        const parsedData: VpdDataPoint[] = [];
        snapshot.forEach((doc) => {
          const parsed = parseVpdData(doc.data());
          if (parsed) {
            parsedData.push(parsed);
          }
        });

        if (parsedData.length > 0) {
          const sortedAscending = parsedData.slice().reverse();
          setVpdHistory(sortedAscending);
          console.log('✓ VPD History updated:', sortedAscending.length, 'entries');
        }
      });
    } catch (err) {
      console.error('❌ Firestore VPD setup error:', err);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // ============================================================================
  // PLANT INFO
  // ============================================================================

  const fetchOtherData = async () => {
    try {
      const plant = await plantService.getPlantInfo();
      setPlantInfo(plant);
    } catch (err) {
      console.error('Error fetching plant info:', err);
    }
  };

  const refreshData = async () => {
    await fetchOtherData();
  };

  useEffect(() => {
    fetchOtherData();
    setIsLoading(false);
  }, []);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value: DashboardContextType = {
    sensorData,
    luxHistory,
    rpmHistory,
    soilMoistureHistory,
    vpdHistory,
    lightDuration,
    soilStatus,
    pumpStatus,
    heaterStatus,
    vpdValue,
    plantInfo,
    isLoading,
    error,
    isRealtimeConnected,
    refreshData,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
