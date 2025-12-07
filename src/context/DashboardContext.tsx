/**
 * ============================================================================
 * DASHBOARD CONTEXT - PUSAT KONTROL FIRESTORE REALTIME
 * ============================================================================
 * 
 * File ini adalah satu-satunya file yang mengatur aliran data Firebase Firestore
 * ke seluruh komponen dashboard. Semua mekanisme pengambilan data, parsing,
 * dan distribusi ada di sini.
 * 
 * FITUR:
 * - Firestore realtime listener dengan onSnapshot
 * - Auto-update saat ada data baru dari server (bukan cache)
 * - Maintain maksimal 10 data terbaru
 * - Parse format ESP32 (integerValue, stringValue)
 * - Format timestamp DD-MM-YYYY_HH-MM-SS → HH:MM
 * - Clean, modular, easy to edit
 * 
 * FIRESTORE PATH:
 * - Collection: growthChamber/group30/sensorData
 * - Query: orderBy timestamp ascending, limit 10
 * - Format: { rpm1, rpm2, rpm3, rpm4, windSpeed, timestamp }
 * 
 * OUTPUT KE UI:
 * - RpmDataPoint[] = [{ time, fan1, fan2, fan3, fan4 }]
 * 
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { getDatabase, ref, onValue, off, DatabaseReference } from 'firebase/database';
import { plantService } from '../services/api.service';
import {
  SensorData,
  LuxDataPoint,
  RpmDataPoint,
  PlantInfo,
  defaultSensorData,
  defaultPlantInfo,
} from '../services/dummyData';

// ============================================================================
// FIREBASE CONFIGURATION & INITIALIZATION
// ============================================================================
const firebaseConfig = {
  apiKey: 'AIzaSyBRQuZFv7qBlftLINSFxgGeMo4j2uYAwtQ',
  authDomain: 'despro-43cdc.firebaseapp.com',
  databaseURL: 'https://despro-43cdc-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'despro-43cdc',
  storageBucket: 'despro-43cdc.firebasestorage.app',
  messagingSenderId: '1022318213486',
  appId: '1:1022318213486:web:5e7f4f4307bda6230f697f',
  measurementId: 'G-N2YW51X1Q9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);

// ============================================================================
// DATA PROCESSING FUNCTIONS
// ============================================================================

/**
 * Parse raw Firestore document data untuk RPM (Group 30)
 */
const parseRpmFirestoreData = (docData: any): RpmDataPoint | null => {
  try {
    const rpm1 = docData.rpm1?.integerValue ? parseInt(docData.rpm1.integerValue) : docData.rpm1 || 0;
    const rpm2 = docData.rpm2?.integerValue ? parseInt(docData.rpm2.integerValue) : docData.rpm2 || 0;
    const rpm3 = docData.rpm3?.integerValue ? parseInt(docData.rpm3.integerValue) : docData.rpm3 || 0;
    const rpm4 = docData.rpm4?.integerValue ? parseInt(docData.rpm4.integerValue) : docData.rpm4 || 0;

    let timestamp = docData.timestamp?.stringValue || docData.timestamp || '';

    if (timestamp.includes('_')) {
      const timePart = timestamp.split('_')[1];
      timestamp = timePart ? timePart.substring(0, 5).replace('-', ':') : timestamp;
    }

    return {
      time: timestamp,
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
 * Parse raw Firestore document data untuk Light Intensity (Group 3)
 */
const parseLightFirestoreData = (docData: any): LuxDataPoint | null => {
  try {
    const lux = docData.lightIntensity?.integerValue
      ? parseInt(docData.lightIntensity.integerValue)
      : docData.lightIntensity || 0;

    let timestamp = docData.timestamp?.stringValue || docData.timestamp || '';

    if (timestamp.includes('_')) {
      const timePart = timestamp.split('_')[1];
      timestamp = timePart ? timePart.substring(0, 5).replace('-', ':') : timestamp;
    }

    return {
      time: timestamp,
      lux: lux,
    };
  } catch (error) {
    console.error('Parse Light error:', error);
    return null;
  }
};

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================
interface DashboardContextType {
  sensorData: SensorData;
  luxHistory: LuxDataPoint[];
  rpmHistory: RpmDataPoint[];
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
// DASHBOARD PROVIDER - PUSAT KONTROL DATA
// ============================================================================
export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [sensorData, setSensorData] = useState<SensorData>(defaultSensorData);
  const [luxHistory, setLuxHistory] = useState<LuxDataPoint[]>([]);
  const [rpmHistory, setRpmHistory] = useState<RpmDataPoint[]>([]);
  const [plantInfo, setPlantInfo] = useState<PlantInfo>(defaultPlantInfo);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState<boolean>(false);

  /**
   * Setup Firebase Realtime Database listeners untuk sensor cards
   * Path structure: status/groupX/sensorName
   */
  useEffect(() => {
    const realtimeRefs: DatabaseReference[] = [];

    try {
      // Temperature: status/group6&35/humidity (NOTE: path contains &, might need encoding)
      const tempRef = ref(rtdb, 'status/group6&35/temperature');
      realtimeRefs.push(tempRef);
      onValue(
        tempRef,
        (snapshot) => {
          const value = snapshot.val();
          if (value !== null && value !== undefined) {
            setSensorData((prev) => ({ ...prev, temperature: Number(value) }));
            setIsRealtimeConnected(true);
            console.log('✓ RTDB Temperature:', value);
          }
        },
        (error) => {
          console.error('❌ RTDB Temperature error:', error);
        }
      );

      // Wind Speed: status/group30/windSpeed
      const windRef = ref(rtdb, 'status/group30/windSpeed');
      realtimeRefs.push(windRef);
      onValue(
        windRef,
        (snapshot) => {
          const value = snapshot.val();
          if (value !== null && value !== undefined) {
            setSensorData((prev) => ({ ...prev, windSpeed: Number(value) }));
            setIsRealtimeConnected(true);
            console.log('✓ RTDB Wind Speed:', value);
          }
        },
        (error) => {
          console.error('❌ RTDB Wind Speed error:', error);
        }
      );

      // Light Intensity: status/group3/lux
      const luxRef = ref(rtdb, 'status/group3/lux');
      realtimeRefs.push(luxRef);
      onValue(
        luxRef,
        (snapshot) => {
          const value = snapshot.val();
          if (value !== null && value !== undefined) {
            setSensorData((prev) => ({ ...prev, lightIntensity: Number(value) }));
            setIsRealtimeConnected(true);
            console.log('✓ RTDB Light Intensity:', value);
          }
        },
        (error) => {
          console.error('❌ RTDB Light Intensity error:', error);
        }
      );

      // Air Humidity: status/group6&35/humidity
      const humidityRef = ref(rtdb, 'status/group6&35/humidity');
      realtimeRefs.push(humidityRef);
      onValue(
        humidityRef,
        (snapshot) => {
          const value = snapshot.val();
          if (value !== null && value !== undefined) {
            setSensorData((prev) => ({ ...prev, airHumidity: Number(value) }));
            setIsRealtimeConnected(true);
            console.log('✓ RTDB Air Humidity:', value);
          }
        },
        (error) => {
          console.error('❌ RTDB Air Humidity error:', error);
        }
      );

      // Soil Moisture: status/group12/soilMoisture
      const soilRef = ref(rtdb, 'status/group12/soilMoisture');
      realtimeRefs.push(soilRef);
      onValue(
        soilRef,
        (snapshot) => {
          const value = snapshot.val();
          if (value !== null && value !== undefined) {
            setSensorData((prev) => ({ ...prev, soilMoisture: Number(value) }));
            setIsRealtimeConnected(true);
            console.log('✓ RTDB Soil Moisture:', value);
          }
        },
        (error) => {
          console.error('❌ RTDB Soil Moisture error:', error);
        }
      );

      // Water Tank: status/group12/waterTank
      const waterRef = ref(rtdb, 'status/group12/waterTank');
      realtimeRefs.push(waterRef);
      onValue(
        waterRef,
        (snapshot) => {
          const value = snapshot.val();
          if (value !== null && value !== undefined) {
            setSensorData((prev) => ({ ...prev, waterTankLevel: Number(value) }));
            setIsRealtimeConnected(true);
            console.log('✓ RTDB Water Tank:', value);
          }
        },
        (error) => {
          console.error('❌ RTDB Water Tank error:', error);
        }
      );

      console.log('✓ Firebase Realtime Database listeners initialized');
    } catch (err) {
      console.error('❌ RTDB setup error:', err);
      setError('Gagal setup Realtime Database');
    }

    // Cleanup: detach all listeners
    return () => {
      realtimeRefs.forEach((dbRef) => {
        off(dbRef);
      });
      console.log('🔌 RTDB listeners detached');
    };
  }, []);

  /**
   * Realtime listener Group 30 (RPM)
   */
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const sensorDataRef = collection(db, 'growthChamber', 'group30', 'sensorData');

      const q = query(sensorDataRef, orderBy('timestamp', 'desc'), limit(10));

      unsubscribe = onSnapshot(
        q,
        { includeMetadataChanges: false },
        (snapshot) => {
          if (snapshot.metadata.fromCache) {
            console.log('⚠️ RPM snapshot from cache (tetap dipakai render)');
          }

          const parsedData: RpmDataPoint[] = [];
          snapshot.forEach((doc) => {
            const parsed = parseRpmFirestoreData(doc.data());
            if (parsed) {
              parsedData.push(parsed);
            }
          });

          if (parsedData.length > 0) {
            const sortedAscending = parsedData.slice().reverse();
            setRpmHistory(sortedAscending);
            console.log('✓ Firebase RPM updated:', sortedAscending.length, 'entries');
            setError(null);
          }

          setIsLoading(false);
        },
        (err) => {
          console.error('❌ Firestore RPM listener error:', err);
          setError('Gagal mengambil data RPM realtime');
          setIsLoading(false);
        }
      );
    } catch (err) {
      console.error('❌ Firestore RPM setup error:', err);
      setError('Gagal setup RPM realtime listener');
      setIsLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  /**
   * Realtime listener Group 3 (Light Intensity)
   */
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const sensorDataRef = collection(db, 'growthChamber', 'group3', 'sensorData');

      const q = query(sensorDataRef, orderBy('timestamp', 'desc'), limit(10));

      unsubscribe = onSnapshot(
        q,
        { includeMetadataChanges: false },
        (snapshot) => {
          if (snapshot.metadata.fromCache) {
            console.log('⚠️ Light snapshot from cache (tetap dipakai render)');
          }

          const parsedData: LuxDataPoint[] = [];
          snapshot.forEach((doc) => {
            const parsed = parseLightFirestoreData(doc.data());
            if (parsed) {
              parsedData.push(parsed);
            }
          });

          if (parsedData.length > 0) {
            const sortedAscending = parsedData.slice().reverse();
            setLuxHistory(sortedAscending);
            console.log('✓ Firebase Light Intensity updated:', sortedAscending.length, 'entries');
          }
        },
        (err) => {
          console.error('❌ Firestore Light listener error:', err);
        }
      );
    } catch (err) {
      console.error('❌ Firestore Light setup error:', err);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  /**
   * Fetch plant info only (tidak fetch sensor data lagi)
   */
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

  const value: DashboardContextType = {
    sensorData,
    luxHistory,
    rpmHistory,
    plantInfo,
    isLoading,
    error,
    isRealtimeConnected,
    refreshData,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

// Export hook after provider to fix Fast Refresh
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
