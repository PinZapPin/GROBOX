# 🌱 Smart Greenhouse Dashboard

Dashboard monitoring dan kontrol smart greenhouse dengan **React + TypeScript**, clean, modern, dan mudah dipelihara.

> **🎯 MULAI DI SINI**: [NEXT_STEPS.md](./NEXT_STEPS.md) - Panduan langkah demi langkah!
> 
> **⚡ Quick Start**: [QUICKSTART.md](./QUICKSTART.md) untuk instalasi cepat
> 
> **📚 Dokumentasi Lengkap**: [DOCS_INDEX.md](./DOCS_INDEX.md) untuk semua panduan

## 🌟 Fitur

- **Real-time Monitoring**: Temperature, Wind Speed, Air Humidity, Soil Moisture, Water Tank Level, Light Intensity
- **Visualisasi Data**: Grafik historis untuk Light Intensity dan Fan RPM menggunakan Recharts
- **Manual Control**: Kontrol manual untuk kipas, pompa air, dan grow light
- **Responsive Design**: UI yang clean, minimalis, dan modern
- **Modular Structure**: Kode terstruktur dan mudah dipelihara

## 📁 Struktur Project

```
website-rev/
├── backend/
│   └── server.js              # Mock API server (Express)
├── src/
│   ├── assets/                # Icons, images, fonts
│   │   ├── font/
│   │   ├── frame/
│   │   └── sidebar/
│   ├── components/
│   │   ├── Cards/             # Semua card komponen
│   │   │   ├── BaseCard.css
│   │   │   ├── TemperatureCard.tsx
│   │   │   ├── WindSpeedCard.tsx
│   │   │   ├── HumidityCard.tsx
│   │   │   ├── SoilMoistureCard.tsx
│   │   │   ├── WaterTankCard.tsx
│   │   │   ├── LightIntensityCard.tsx
│   │   │   ├── LuxHistoryChart.tsx
│   │   │   ├── RpmHistoryChart.tsx
│   │   │   └── CircularGauge.tsx
│   │   ├── PlantInfo/
│   │   │   ├── PlantInfo.tsx
│   │   │   └── PlantInfo.css
│   │   └── Sidebar/
│   │       ├── Sidebar.tsx
│   │       └── Sidebar.css
│   ├── context/
│   │   └── DashboardContext.tsx  # State management dengan Context API
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── DashboardPage.css
│   │   ├── ManualControl/
│   │   │   ├── ManualControlPage.tsx
│   │   │   └── ManualControlPage.css
│   │   └── About/
│   │       ├── AboutPage.tsx
│   │       └── AboutPage.css
│   ├── services/
│   │   ├── api.service.ts     # Service layer untuk API calls
│   │   └── dummyData.ts       # Data dummy yang mudah diganti
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```powershell
npm install
```

### 2. Jalankan Backend (Terminal 1)

```powershell
npm run server
```

Backend akan berjalan di `http://localhost:5000`

### 3. Jalankan Frontend (Terminal 2)

```powershell
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 🔧 Integrasi dengan Firebase

Semua data dummy sudah dipisahkan dalam file khusus untuk memudahkan integrasi dengan Firebase.

### File yang Perlu Dimodifikasi:

1. **src/services/dummyData.ts** - Ganti dengan data dari Firebase
2. **src/services/api.service.ts** - Ganti axios calls dengan Firebase SDK
3. **src/context/DashboardContext.tsx** - Update fetch logic untuk Firebase

### Contoh Integrasi Firebase:

```typescript
// Install Firebase SDK
npm install firebase

// Di api.service.ts
import { getDatabase, ref, onValue } from 'firebase/database';

export const sensorService = {
  getCurrentData: () => {
    const db = getDatabase();
    const sensorsRef = ref(db, 'sensors/current');
    return new Promise((resolve) => {
      onValue(sensorsRef, (snapshot) => {
        resolve(snapshot.val());
      });
    });
  },
};
```

## 🎨 Customization

### Ubah Warna Tema

Edit file CSS masing-masing komponen di folder `src/components/Cards/`

### Ubah Font

Font Poppins sudah diload dari Google Fonts. Untuk menggunakan font lokal dari folder `assets/font/`, edit `src/index.css`:

```css
@font-face {
  font-family: 'Poppins';
  src: url('/assets/font/Poppins-Regular.ttf') format('truetype');
}
```

### Tambah Card Baru

1. Buat file component di `src/components/Cards/`
2. Import dan gunakan di `src/pages/Dashboard/DashboardPage.tsx`
3. Tambahkan data di `src/services/dummyData.ts`

## 📦 Build untuk Production

```powershell
npm run build
```

Output akan ada di folder `dist/`

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router v6
- **Charts**: Recharts
- **Backend Mock**: Express.js
- **State Management**: React Context API
- **Styling**: CSS Modules dengan design system

## 📝 Catatan Penting

- Semua variabel menggunakan **camelCase**
- Struktur modular dan mudah diedit
- Data dummy terpisah dari logic komponen
- Siap untuk integrasi Firebase
- Clean, scalable, dan maintainable code

## 👥 Developer

Proyek Desain Proyek 2 - Teknik Elektro Semester 7

---

**Happy Coding! 🌱**
