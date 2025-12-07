# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan Smart Greenhouse Dashboard

## ✅ Prerequisites

- Node.js versi 18 atau lebih baru
- npm atau yarn
- Text editor (VS Code recommended)

## 📥 Installation

### 1. Install Dependencies

Buka terminal dan jalankan:

```powershell
npm install
```

### 2. Setup Assets

Copy semua file assets (logo, icons, gambar tanaman) ke folder:
- `public/assets/frame/` - untuk icons dashboard
- `public/assets/sidebar/` - untuk icons sidebar

Lihat `ASSETS_GUIDE.md` untuk detail lengkap.

## 🏃 Running the Application

### Development Mode

Anda perlu 2 terminal:

**Terminal 1 - Backend:**
```powershell
npm run server
```
Backend akan running di http://localhost:5000

**Terminal 2 - Frontend:**
```powershell
npm run dev
```
Frontend akan running di http://localhost:3000

Buka browser dan akses: http://localhost:3000

## 📂 Struktur Folder Penting

```
src/
├── components/        # Semua komponen UI
│   ├── Cards/        # Card-card dashboard (Frame 1-8)
│   ├── Sidebar/      # Komponen sidebar
│   └── PlantInfo/    # Info tanaman
├── context/          # State management (DashboardContext)
├── services/         # API service & dummy data
│   ├── api.service.ts    # Service untuk fetch data
│   └── dummyData.ts      # ⭐ DATA DUMMY - Edit di sini!
└── pages/            # Halaman-halaman utama
    ├── Dashboard/
    ├── ManualControl/
    └── About/
```

## 🔧 Kustomisasi Cepat

### Ganti Data Dummy

Edit file: `src/services/dummyData.ts`

```typescript
export const defaultSensorData: SensorData = {
  temperature: 26.5,      // Ubah nilai di sini
  windSpeed: 2.3,
  airHumidity: 65,
  // ... dst
};
```

### Ganti Warna Tema

Edit file CSS komponen yang ingin diubah, contoh:
- `src/components/Cards/TemperatureCard.css` - untuk card temperature
- `src/components/Sidebar/Sidebar.css` - untuk sidebar
- `src/App.css` - untuk layout utama

### Ganti Judul Dashboard

Edit file: `src/pages/Dashboard/DashboardPage.tsx`

```tsx
<h1 className="dashboard-title">Judul Proyek Ini</h1>
```

## 🔥 Integrasi Firebase

Saat siap connect ke Firebase:

1. Baca panduan lengkap di `FIREBASE_INTEGRATION.md`
2. Install Firebase SDK: `npm install firebase`
3. Copy `.env.example` ke `.env` dan isi credentials
4. Update `src/services/api.service.ts`

## 🐛 Troubleshooting

### Error: Cannot find module

```powershell
# Hapus node_modules dan install ulang
rm -r node_modules
npm install
```

### Port sudah digunakan

Edit port di `vite.config.ts` atau `backend/server.js`

### Assets tidak muncul

Pastikan file assets ada di folder `public/assets/` dan path-nya benar.

## 📦 Build Production

```powershell
npm run build
```

File hasil build ada di folder `dist/`

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Setup assets (logo, icons, gambar)
3. ✅ Run backend dan frontend
4. ✅ Test di browser
5. 🔄 Kustomisasi sesuai kebutuhan
6. 🔥 Integrasi Firebase (opsional)
7. 📦 Build untuk production

## 💡 Tips

- Gunakan **VS Code** dengan extension "ES7+ React/Redux/React-Native snippets"
- Install **Prettier** untuk auto-formatting
- Gunakan **React Developer Tools** di browser untuk debugging
- Baca komentar di setiap file untuk memahami strukturnya

## 📞 Need Help?

Baca dokumentasi lengkap di:
- `README.md` - Overview project
- `FIREBASE_INTEGRATION.md` - Panduan Firebase
- `ASSETS_GUIDE.md` - Panduan assets

---

**Selamat coding! 🌱**
