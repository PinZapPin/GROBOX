# 📋 Project Structure Summary

Struktur lengkap project Smart Greenhouse Dashboard yang sudah dibuat.

## 🗂️ Root Level Files

```
website-rev/
├── .env.example                 # Template environment variables
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier formatting config
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript config
├── tsconfig.node.json          # TypeScript config for Node
├── vite.config.ts              # Vite bundler config
├── README.md                   # Dokumentasi utama
├── QUICKSTART.md               # Panduan cepat mulai
├── FIREBASE_INTEGRATION.md     # Panduan integrasi Firebase
└── ASSETS_GUIDE.md             # Panduan assets
```

## 📁 Folder Structure

### Backend (Mock API)
```
backend/
└── server.js                   # Express server untuk mock API
```

### Source Code
```
src/
├── App.tsx                     # Main App component
├── App.css                     # App styling
├── main.tsx                    # React entry point
├── index.css                   # Global styles
│
├── components/                 # UI Components
│   ├── index.ts               # Barrel export
│   ├── Cards/                 # Dashboard cards
│   │   ├── index.ts
│   │   ├── BaseCard.css       # Base card styling
│   │   ├── TemperatureCard.tsx      # Frame 1
│   │   ├── TemperatureCard.css
│   │   ├── WindSpeedCard.tsx        # Frame 2
│   │   ├── WindSpeedCard.css
│   │   ├── CircularGauge.tsx        # Reusable gauge
│   │   ├── CircularGauge.css
│   │   ├── HumidityCard.tsx         # Frame 3
│   │   ├── SoilMoistureCard.tsx     # Frame 4
│   │   ├── WaterTankCard.tsx        # Frame 5
│   │   ├── WaterTankCard.css
│   │   ├── LightIntensityCard.tsx   # Frame 6
│   │   ├── LightIntensityCard.css
│   │   ├── LuxHistoryChart.tsx      # Frame 7
│   │   ├── LuxHistoryChart.css
│   │   ├── RpmHistoryChart.tsx      # Frame 8
│   │   └── RpmHistoryChart.css
│   │
│   ├── PlantInfo/             # Plant info component
│   │   ├── PlantInfo.tsx
│   │   └── PlantInfo.css
│   │
│   └── Sidebar/               # Navigation sidebar
│       ├── Sidebar.tsx
│       └── Sidebar.css
│
├── context/                   # State Management
│   └── DashboardContext.tsx   # Main context provider
│
├── pages/                     # Page components
│   ├── Dashboard/
│   │   ├── DashboardPage.tsx
│   │   └── DashboardPage.css
│   ├── ManualControl/
│   │   ├── ManualControlPage.tsx
│   │   └── ManualControlPage.css
│   └── About/
│       ├── AboutPage.tsx
│       └── AboutPage.css
│
└── services/                  # Business logic
    ├── api.service.ts         # API calls
    └── dummyData.ts          # ⭐ Dummy data (ganti dengan Firebase)
```

### Public Assets
```
public/
└── assets/
    ├── frame/                # Dashboard icons & images
    │   ├── .gitkeep
    │   └── (place your icons here)
    └── sidebar/              # Sidebar icons
        ├── .gitkeep
        └── (place your icons here)
```

### VS Code Settings
```
.vscode/
├── extensions.json           # Recommended extensions
└── settings.json            # Workspace settings
```

### Original Assets (dari project lama)
```
assets/
├── font/
│   └── OFL.txt
├── frame/
└── sidebar/
```

## 🎯 File Penting untuk Edit

### 1. Data Dummy
📍 **File**: `src/services/dummyData.ts`
- Tempat semua data dummy
- Ganti dengan Firebase data

### 2. API Service
📍 **File**: `src/services/api.service.ts`
- Service layer untuk fetch data
- Update saat integrasi Firebase

### 3. Dashboard Context
📍 **File**: `src/context/DashboardContext.tsx`
- State management
- Real-time data handling

### 4. Environment Variables
📍 **File**: `.env.example`
- Template untuk config
- Copy ke `.env` dan isi credentials

## 🚀 Scripts Available

```json
{
  "dev": "vite",              // Run frontend (port 3000)
  "build": "tsc && vite build", // Build production
  "preview": "vite preview",   // Preview production build
  "server": "node backend/server.js" // Run backend (port 5000)
}
```

## 📊 Component Mapping (Frame 1-8)

| Frame | Component | File | Description |
|-------|-----------|------|-------------|
| 1 | TemperatureCard | `Cards/TemperatureCard.tsx` | Temperature display |
| 2 | WindSpeedCard | `Cards/WindSpeedCard.tsx` | Wind speed display |
| 3 | HumidityCard | `Cards/HumidityCard.tsx` | Air humidity gauge |
| 4 | SoilMoistureCard | `Cards/SoilMoistureCard.tsx` | Soil moisture gauge |
| 5 | WaterTankCard | `Cards/WaterTankCard.tsx` | Water tank indicator |
| 6 | LightIntensityCard | `Cards/LightIntensityCard.tsx` | Light intensity |
| 7 | LuxHistoryChart | `Cards/LuxHistoryChart.tsx` | Historical lux chart |
| 8 | RpmHistoryChart | `Cards/RpmHistoryChart.tsx` | Historical RPM chart |

## 🎨 Design System

### Colors
- **Primary Green**: `#4a9d5f`
- **Background Cream**: `#f5f0e8`
- **Text Dark**: `#2c3e50`
- **Text Light**: `#7f8c8d`

### Gradients
- **Dashboard**: `linear-gradient(135deg, #e8f5e9 0%, #ffffff 50%, #f1f8e9 100%)`
- **Temperature hover**: `linear-gradient(90deg, #ff9a56 0%, #ffffff 100%)`
- **Wind hover**: `linear-gradient(90deg, #87ceeb 0%, #ffffff 100%)`
- **Light hover**: `linear-gradient(90deg, #ffd54f 0%, #ffffff 100%)`

### Typography
- **Font Family**: Poppins (dari Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🔗 Dependencies

### Production
- react ^18.2.0
- react-dom ^18.2.0
- react-router-dom ^6.20.0
- recharts ^2.10.3
- axios ^1.6.2

### Development
- typescript ^5.3.3
- vite ^5.0.8
- @vitejs/plugin-react ^4.2.1

### Backend
- express ^4.18.2
- cors ^2.8.5

## 📝 Naming Conventions

- **Variables**: camelCase (`sensorData`, `luxHistory`)
- **Components**: PascalCase (`TemperatureCard`, `DashboardPage`)
- **Files**: PascalCase for components (`TemperatureCard.tsx`)
- **Folders**: PascalCase for component folders (`Cards/`, `Sidebar/`)
- **CSS**: kebab-case classes (`.sensor-card`, `.card-title`)

## 🔥 Firebase Integration Points

Saat ready untuk Firebase, edit:
1. `src/services/api.service.ts` - Ganti axios dengan Firebase SDK
2. `src/context/DashboardContext.tsx` - Update fetch logic
3. `.env` - Tambahkan Firebase credentials
4. Create `src/config/firebase.config.ts` - Firebase initialization

## ✅ Checklist Setup

- [x] Project structure created
- [x] All components implemented
- [x] Routing setup
- [x] Context API for state management
- [x] Mock backend API
- [x] Styling with gradients & animations
- [x] Documentation files
- [ ] Add assets (logo, icons, images)
- [ ] Test all features
- [ ] Integrate Firebase (optional)
- [ ] Deploy to production

---

**Struktur ini dibuat modular, scalable, dan mudah dipelihara! 🌱**
