# 🌱 Smart Greenhouse Dashboard

Dashboard monitoring dan kontrol smart greenhouse dengan **React + TypeScript** yang terintegrasi dengan **Firebase Realtime Database** dan **Firestore**.

## 🌟 Fitur

- **Real-time Monitoring**: Temperature, Wind Speed, Air Humidity, Soil Moisture, Water Tank Level, Light Intensity
- **Visualisasi Data Historis**: Grafik untuk Light Intensity dan Fan RPM menggunakan Recharts + Firestore
- **Manual Control**: Kontrol kipas dan lampu dengan mode auto/manual via Firebase RTDB
- **Responsive Design**: UI minimalis dan modern yang responsif di semua perangkat
- **Firebase Integration**: Data realtime dari Firebase Realtime Database dan Firestore

## 🏗️ Arsitektur

### Pages
1. **Dashboard Page** - Monitoring sensor realtime dan visualisasi data historis
2. **Manual Control Page** - Kontrol kipas dan lampu dengan Firebase RTDB
3. **About Page** - Informasi proyek

### Data Flow

#### Firebase Realtime Database (RTDB)
Digunakan untuk data sensor realtime dan control state:

**Sensor Data Paths:**
- `status/group2/temperature` - Suhu (°C)
- `status/group2/windSpeed` - Kecepatan angin (m/s)
- `status/group2/airHumidity` - Kelembaban udara (%)
- `status/group2/soilMoisture` - Kelembaban tanah (%)
- `status/group2/waterTank` - Level tangki air (%)
- `status/group2/luxSensor` - Intensitas cahaya (lux)

**Control Paths (Manual Control Page):**
- `status/group30/autoControl` - Mode auto/manual kipas (boolean)
- `status/group30/duty` - Duty cycle kipas 0-100 (%)
- `status/group3/lampStatus` - Status lampu on/off (boolean)
- `status/group3/autoControl` - Mode auto/manual lampu (boolean)
- `status/group3/duty` - PWM lampu 0-255

#### Firestore
Digunakan untuk data historis (time-series):

**Collections:**
- `growthChamber/group30/sensorData` - Historis lux (field: `time`, `lux`)
- `growthChamber/group30/sensorData` - Historis RPM kipas (fields: `time`, `fan1`, `fan2`, `fan3`, `fan4`)

### State Management
- **DashboardContext** (Context API) - Centralized state dengan realtime Firebase listeners

## 📁 Struktur Project

```
website-rev/
├── src/
│   ├── assets/                # Icons, images, fonts
│   ├── components/
│   │   ├── Cards/             # Card components untuk sensor
│   │   │   ├── TemperatureCard.tsx
│   │   │   ├── WindSpeedCard.tsx
│   │   │   ├── HumidityCard.tsx
│   │   │   ├── SoilMoistureCard.tsx
│   │   │   ├── WaterTankCard.tsx
│   │   │   ├── LightIntensityCard.tsx
│   │   │   ├── LuxHistoryChart.tsx      # Firestore history
│   │   │   ├── RpmHistoryChart.tsx      # Firestore history
│   │   │   └── CircularGauge.tsx
│   │   ├── PlantInfo/         # Plant info component
│   │   └── Sidebar/           # Navigation sidebar
│   ├── context/
│   │   └── DashboardContext.tsx  # Firebase listeners & state
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── DashboardPage.css
│   │   ├── ManualControl/
│   │   │   ├── ManualControlPage.tsx  # Fan & Light control
│   │   │   └── ManualControlPage.css
│   │   └── About/
│   ├── services/
│   │   ├── api.service.ts
│   │   └── dummyData.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```powershell
npm install
```

### 2. Jalankan Development Server

```powershell
npm run dev
```

Frontend akan berjalan di `http://localhost:3000/GROBOX/`

## 🔧 Firebase Configuration

Firebase config sudah terintegrasi di:
- `src/context/DashboardContext.tsx` (RTDB + Firestore untuk Dashboard)
- `src/pages/ManualControl/ManualControlPage.tsx` (RTDB untuk control)

**Firebase Project**: `despro-43cdc`

### Firestore Rules (untuk data historis)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /growthChamber/group30/sensorData/{document} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### RTDB Rules (untuk sensor & control)
```json
{
  "rules": {
    "status": {
      ".read": true,
      ".write": true
    }
  }
}
```

## 🎨 UI Features

### Dashboard Page
- 6 sensor cards dengan realtime data dari Firebase RTDB
- 2 grafik historis (Lux & RPM) dari Firestore
- Plant info panel
- Fallback UI ketika Firebase belum terhubung

### Manual Control Page
- **Fan Control**: 4 kipas individual dengan RPM realtime, mode auto/manual, duty 0-100%
- **Light Control**: ON/OFF toggle, mode auto/manual, PWM 0-255
- Desain kipas minimalis 7-blade abu-hitam
- Fully responsive layout

## 📦 Build & Deploy

### Build untuk Production

```powershell
npm run build
```

### Deploy ke GitHub Pages

```powershell
npm run deploy
```

Website live di: **https://pinzappin.github.io/GROBOX/**

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router v6
- **Charts**: Recharts
- **Backend**: Firebase Realtime Database + Firestore
- **State Management**: React Context API
- **Styling**: CSS dengan responsive design
- **Deployment**: GitHub Pages

## 👥 Developer

Proyek Desain Proyek 2 - Teknik Elektro Semester 7

---

**Happy Coding! 🌱**
