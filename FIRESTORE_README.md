# 🔥 Firebase Firestore Integration - Clean & Simple

## 📋 Overview

Integrasi Firebase Firestore untuk dashboard React + TypeScript dengan arsitektur **single-file control center**. Semua logic Firebase ada dalam **satu file saja**: `src/context/DashboardContext.tsx`

---

## 🎯 Fitur

✅ **Realtime Listener** - onSnapshot untuk update otomatis  
✅ **Server-side Only** - Tidak pakai cache lokal  
✅ **10 Data Terbaru** - Auto-maintain array max 10 entries  
✅ **No Re-render** - Update hanya saat ada data baru  
✅ **Auto Parse** - Handle format ESP32 (integerValue/stringValue)  
✅ **Clean Code** - CamelCase, modular, easy to edit  
✅ **Stable Chart** - No animation, grafik stabil  

---

## 📁 Struktur File

```
src/
└── context/
    └── DashboardContext.tsx  ← PUSAT KONTROL FIRESTORE (SATU FILE!)
```

**File ini mengatur:**
- Firebase config & initialization
- Firestore realtime listener
- Data parsing & formatting
- State management
- Distribution ke UI components

---

## 🚀 Quick Start

### 1. Pastikan Data di Firestore

**Path:** `growthChamber/group30/sensorData`

**Format dokumen:**
```javascript
{
  rpm1: { integerValue: "1200" },
  rpm2: { integerValue: "1300" },
  rpm3: { integerValue: "1150" },
  rpm4: { integerValue: "1400" },
  windSpeed: { integerValue: "2" },
  timestamp: { stringValue: "07-12-2025_14-30-00" }
}
```

### 2. Setup Firestore Rules

Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /growthChamber/{group}/sensorData/{document} {
      allow read: if true;
    }
  }
}
```

### 3. Run Application

```bash
npm run dev
```

Browser console akan menampilkan:
```
✓ Firebase RPM updated: 10 entries
```

---

## 📊 Data Flow

```
ESP32 
  → Firestore (growthChamber/group30/sensorData)
    → onSnapshot listener (DashboardContext.tsx)
      → Parse data
        → Update state (max 10 entries)
          → RpmHistoryChart component
            → Recharts visualization
```

---

## 🎨 Chart Configuration

**Component:** `RpmHistoryChart.tsx`

**Features:**
- 4 fan lines: rpm1 (red), rpm2 (blue), rpm3 (green), rpm4 (orange)
- X-axis: timestamp (HH:MM format)
- Y-axis: RPM values
- No animation (`isAnimationActive={false}`)
- Stable, no unnecessary re-renders

---

## 🔧 Cara Edit

### Tambah Grup Lain (group12, group3, etc.)

Di `DashboardContext.tsx`, duplicate useEffect untuk listener:

```typescript
// Group 30 (sudah ada)
useEffect(() => {
  const sensorDataRef = collection(db, 'growthChamber', 'group30', 'sensorData');
  // ... rest of code
}, []);

// Group 12 (tambahan)
useEffect(() => {
  const sensorDataRef = collection(db, 'growthChamber', 'group12', 'sensorData');
  // ... same pattern
  // Update state: setGroup12Data() instead of setRpmHistory()
}, []);
```

### Ubah Limit Data (default: 10)

Di query:
```typescript
limit(10) // Ganti angka ini (misal: 20, 50, dll)
```

Di maintainLatestData:
```typescript
return combined.slice(-10); // Ganti -10 jadi -20, -50, dll
```

### Tambah Metric Lain (temperature, humidity, etc.)

Update `parseFirestoreData()`:
```typescript
const parseFirestoreData = (docData: any) => {
  return {
    time: ...,
    fan1: ...,
    fan2: ...,
    temperature: docData.temperature || 0, // NEW
    humidity: docData.humidity || 0,       // NEW
  };
};
```

---

## 🐛 Troubleshooting

### Data tidak muncul?
1. Check Firestore Console → data exists?
2. Check browser console → any errors?
3. Check Firestore rules → allow read?
4. Check collection path → `growthChamber/group30/sensorData`

### "Data from cache, skipping..."
✅ Normal! Ini berarti listener skip cache, tunggu data dari server.

### Chart tidak update?
1. ESP32 kirim data baru?
2. Timestamp format benar? (DD-MM-YYYY_HH-MM-SS)
3. Field names match? (rpm1, rpm2, rpm3, rpm4)

---

## 📝 Important Notes

### ESP32 Format
**HARUS** menggunakan format:
```javascript
{
  rpm1: { integerValue: "1200" },  // String dalam integerValue
  timestamp: { stringValue: "..." }
}
```

### Timestamp Format
Document ID = timestamp = `DD-MM-YYYY_HH-MM-SS`

Example: `07-12-2025_14-30-00`

### No Dummy Fallback
Tidak ada fallback ke dummy data. Jika Firestore error, state tetap kosong sampai koneksi berhasil.

---

## ✨ Keunggulan Arsitektur

1. **Single File Control** - Semua logic di satu tempat, mudah edit
2. **Realtime Updates** - onSnapshot auto-update saat ada data baru
3. **No Cache Pollution** - Selalu data terbaru dari server
4. **Efficient Re-renders** - Update state hanya saat perlu
5. **Scalable** - Mudah tambah grup/metric baru
6. **Clean Code** - CamelCase, well-commented, modular

---

## 🎓 File Reference

| File | Purpose |
|------|---------|
| `src/context/DashboardContext.tsx` | Pusat kontrol Firestore (EDIT DI SINI!) |
| `src/components/Cards/RpmHistoryChart.tsx` | Chart visualization |
| `src/services/dummyData.ts` | Type definitions |

---

**Status:** ✅ Production Ready  
**Last Updated:** December 7, 2025  
**Architecture:** Single-file control center
