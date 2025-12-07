# 🔥 Firebase Quick Reference Card

## 📍 Lokasi File Utama
```
src/context/DashboardContext.tsx  ← EDIT DI SINI!
```

---

## 🎯 Firestore Configuration

### Path
```
growthChamber/group30/sensorData
```

### Query
```typescript
orderBy('timestamp', 'asc')
limit(10)
```

### ESP32 Format
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

---

## 🔧 Common Edits

### 1. Ubah Limit Data (10 → 20)
```typescript
// Line ~169
limit(10)  →  limit(20)

// Line ~89
combined.slice(-10)  →  combined.slice(-20)
```

### 2. Tambah Group12
```typescript
// Duplicate useEffect (~line 160)
useEffect(() => {
  const sensorDataRef = collection(db, 'growthChamber', 'group12', 'sensorData');
  // ... rest sama
}, []);
```

### 3. Tambah Metric Temperature
```typescript
// Update parseFirestoreData (~line 67)
return {
  time: timestamp,
  fan1: rpm1,
  fan2: rpm2,
  fan3: rpm3,
  fan4: rpm4,
  temperature: docData.temperature || 0,  // NEW
};
```

---

## 📊 Chart Colors

| Fan | Color | Hex |
|-----|-------|-----|
| Fan 1 | Red | #e74c3c |
| Fan 2 | Blue | #3498db |
| Fan 3 | Green | #2ecc71 |
| Fan 4 | Orange | #f39c12 |

---

## 🚀 Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start backend (dummy data)
npm run server
```

---

## 🐛 Debug Console

```
✓ Firebase RPM updated: 10 entries  ← Success
⚠️ Data from cache, skipping...     ← Normal (waiting server)
❌ Firestore listener error: ...    ← Check Firestore rules
```

---

## 📝 Firestore Rules

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

---

## ✅ Checklist

- [ ] ESP32 mengirim data dengan format benar
- [ ] Firestore rules allow read
- [ ] Collection path: `growthChamber/group30/sensorData`
- [ ] Document ID = timestamp (DD-MM-YYYY_HH-MM-SS)
- [ ] `npm run dev` berjalan tanpa error
- [ ] Browser console: "✓ Firebase RPM updated"
- [ ] Chart menampilkan 4 fan lines

---

**Quick Access:** Bookmark file ini untuk referensi cepat!
