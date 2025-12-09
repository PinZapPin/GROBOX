# 🌱 G.R.O.B.O.X Dashboard

Dashboard monitoring dan kontrol smart greenhouse dengan **React + TypeScript** yang terintegrasi dengan **Firebase Realtime Database**, **Firestore**, dan **Gemini AI Assistant**.

## 🌟 Fitur

- **Real-time Monitoring**: Temperature, Wind Speed, Air Humidity, Soil Moisture, Water Tank Level, Light Intensity
- **Visualisasi Data Historis**: Grafik untuk Light Intensity dan Fan RPM menggunakan Recharts + Firestore
- **Manual Control**: Kontrol kipas dan lampu dengan mode auto/manual via Firebase RTDB
- **AI Assistant**: Chat dengan Gemini AI untuk analisis data dan rekomendasi (floating button di setiap halaman)
- **Responsive Design**: UI minimalis dan modern yang responsif di semua perangkat
- **Firebase Integration**: Data realtime dari Firebase Realtime Database dan Firestore
- **Secure API Management**: API keys tersentralisasi dan di-ignore dari Git

## 🔒 Security Setup (PENTING!)

**SEBELUM PUSH KE GITHUB**, pastikan file API configuration sudah di-setup dengan benar:

1. File `src/config/apiConfig.ts` sudah berisi API keys Anda
2. File tersebut **OTOMATIS DI-IGNORE** dari Git (sudah ada di `.gitignore`)
3. Baca dokumentasi lengkap di **[API_SECURITY_SETUP.md](API_SECURITY_SETUP.md)**

Untuk developer baru yang clone repository:
```bash
# Copy template
cp src/config/apiConfig.example.ts src/config/apiConfig.ts

# Edit dan isi dengan API keys Anda
nano src/config/apiConfig.ts
```

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
│   │   ├── AiChat/            # 🆕 AI Chat components
│   │   │   ├── AiChatButton.tsx    # Floating AI button
│   │   │   ├── AiChatPanel.tsx     # Chat panel UI
│   │   │   └── AiChat.css          # Chat styling
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
│   ├── config/                # 🆕 API Configuration (SECURE)
│   │   ├── apiConfig.ts       # ⚠️ IGNORED from Git (contains real keys)
│   │   └── apiConfig.example.ts # Template for new developers
│   ├── context/
│   │   └── DashboardContext.tsx  # Firebase listeners & state
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx     # 🆕 + AI Chat button
│   │   │   └── DashboardPage.css
│   │   ├── ManualControl/
│   │   │   ├── ManualControlPage.tsx # Fan & Light control + 🆕 AI Chat
│   │   │   └── ManualControlPage.css
│   │   └── About/
│   ├── services/
│   │   ├── geminiService.ts   # 🆕 Gemini AI integration
│   │   ├── api.service.ts
│   │   └── dummyData.ts
│   ├── App.tsx
│   └── main.tsx
├── .gitignore                 # 🆕 Updated to ignore apiConfig.ts
├── package.json
├── vite.config.ts
├── README.md
├── AI_CHAT_README.md          # 🆕 AI Chat setup guide
└── API_SECURITY_SETUP.md      # 🆕 Security documentation
```

## 🤖 AI Chat Assistant

Dashboard dilengkapi dengan floating AI chat button (Gemini AI) yang tersedia di:
- Dashboard Page
- Manual Control Page

**Features:**
- 💬 Chat dengan AI tentang sensor data
- 🎯 Quick questions untuk pertanyaan umum
- 🔄 Real-time responses menggunakan Gemini API
- 🧠 Context-aware (memahami konteks greenhouse monitoring)
- 🔒 API key tersentralisasi dan aman

**Setup:**
Baca dokumentasi lengkap di **[AI_CHAT_README.md](AI_CHAT_README.md)**

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```powershell
npm install
```

### 2. Setup API Configuration

```powershell
# Copy template file
cp src/config/apiConfig.example.ts src/config/apiConfig.ts

# Edit dan isi dengan API keys Anda (Firebase + Gemini)
# File ini TIDAK AKAN ter-commit ke Git (sudah di-ignore)
```

### 3. Jalankan Development Server

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
