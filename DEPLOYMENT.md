# 🚀 Panduan Deployment ke GitHub Pages

## Langkah 1: Persiapan Repository GitHub

1. **Buat repository baru di GitHub:**
   - Buka https://github.com/new
   - Nama repository: `GROBOX` (atau nama lain)
   - Pilih **Public**
   - Jangan centang "Add README, .gitignore, license"
   - Klik **Create repository**

2. **Copy URL repository yang baru dibuat** (contoh):
   ```
   https://github.com/PinZapPin/GROBOX
   ```

---

## Langkah 2: Update Konfigurasi

**PENTING:** Ganti `USERNAME` dan `REPO-NAME` di file-file berikut:

### A. Update `package.json`
Ganti baris:
```json
"homepage": "https://USERNAME.github.io/REPO-NAME",
```
Contoh:
```json
"homepage": "https://johndoe.github.io/smart-greenhouse-dashboard",
```

### B. Update `vite.config.ts`
Ganti baris:
```typescript
base: '/REPO-NAME/',
```
Contoh:
```typescript
base: '/smart-greenhouse-dashboard/',
```

---

## Langkah 3: Install gh-pages

Buka terminal di folder project dan jalankan:

```powershell
npm install --save-dev gh-pages
```

---

## Langkah 4: Inisialisasi Git dan Push ke GitHub

Jalankan perintah berikut satu per satu di terminal:

```powershell
# 1. Inisialisasi Git (jika belum)
git init

# 2. Add semua file
git add .

# 3. Commit pertama
git commit -m "Initial commit: Smart Greenhouse Dashboard"

# 4. Tambahkan remote repository (ganti dengan URL kamu)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# 5. Push ke branch main
git branch -M main
git push -u origin main
```

---

## Langkah 5: Deploy ke GitHub Pages

Setelah push berhasil, jalankan:

```powershell
npm run deploy
```

Perintah ini akan:
1. Build project (compile TypeScript + bundle)
2. Create branch `gh-pages`
3. Push folder `dist` ke branch `gh-pages`

---

## Langkah 6: Aktifkan GitHub Pages

1. Buka repository di GitHub
2. Klik **Settings** (tab)
3. Klik **Pages** (menu kiri)
4. Di bagian **Source**, pilih:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Klik **Save**

Tunggu 1-2 menit, website akan live di:
```
https://USERNAME.github.io/REPO-NAME/
```

---

## 🔄 Update Website di Masa Depan

Setiap kali ada perubahan code:

```powershell
# 1. Save dan commit perubahan
git add .
git commit -m "Update: deskripsi perubahan"

# 2. Push ke main branch
git push

# 3. Deploy ulang ke GitHub Pages
npm run deploy
```

---

## ⚠️ Catatan Penting

### Firebase Configuration
Pastikan file `.env` **TIDAK** di-push ke GitHub (sudah ada di `.gitignore`).

Untuk production, gunakan **GitHub Secrets**:
1. Buka repository → Settings → Secrets and variables → Actions
2. Tambahkan secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - dll.

### Path Assets
Semua path assets harus relative atau menggunakan base URL:
```tsx
// ❌ Salah
<img src="/assets/icon.png" />

// ✅ Benar
<img src="./assets/icon.png" />
// atau
<img src={`${import.meta.env.BASE_URL}assets/icon.png`} />
```

### Firestore Rules
Pastikan Firestore security rules di Firebase Console sudah benar:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /growthChamber/{group}/{document=**} {
      allow read: if true;  // Public read
      allow write: if false; // Hanya ESP32 yang write (gunakan service account)
    }
  }
}
```

---

## 🛠️ Troubleshooting

### 1. "404 Not Found" setelah deploy
- Pastikan `base` di `vite.config.ts` sudah benar
- Pastikan GitHub Pages source sudah diset ke `gh-pages` branch

### 2. Assets tidak muncul
- Periksa path assets (gunakan relative path)
- Periksa console browser untuk error 404

### 3. Firebase tidak konek
- Periksa Firebase configuration di `.env`
- Periksa Firestore rules
- Periksa browser console untuk error

### 4. Build error
```powershell
# Clear cache dan rebuild
rm -r dist
rm -r node_modules/.vite
npm run build
```

---

## 📱 Alternatif Hosting Lain

Jika tidak ingin GitHub Pages, bisa gunakan:

### A. **Vercel** (Recommended)
```powershell
npm install -g vercel
vercel
```

### B. **Netlify**
```powershell
npm install -g netlify-cli
netlify deploy
```

### C. **Firebase Hosting**
```powershell
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

Semua platform di atas gratis dan lebih mudah dari GitHub Pages!

---

## ✅ Checklist

- [ ] Repository GitHub sudah dibuat
- [ ] `package.json` homepage sudah diganti
- [ ] `vite.config.ts` base sudah diganti
- [ ] `gh-pages` package sudah terinstall
- [ ] Git sudah di-init dan push ke GitHub
- [ ] `npm run deploy` berhasil
- [ ] GitHub Pages sudah diaktifkan di Settings
- [ ] Website bisa diakses di browser

---

**Selamat! Website kamu sudah live! 🎉**
