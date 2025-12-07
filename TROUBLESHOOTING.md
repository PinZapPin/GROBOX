# 🔧 Troubleshooting & FAQ

## ❗ Common Issues & Solutions

### 1. npm install gagal

**Error**: `npm ERR! code EINTEGRITY`

**Solusi**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules dan package-lock.json
rm -r node_modules
rm package-lock.json

# Install ulang
npm install
```

### 2. Cannot find module '@/*'

**Error**: `Cannot find module '@/components/...'`

**Solusi**:
Path alias mungkin belum terkonfigurasi. Pastikan `vite.config.ts` dan `tsconfig.json` sudah benar.

Alternatif: Gunakan relative imports sementara:
```typescript
// Ganti
import { Sidebar } from '@/components';

// Dengan
import Sidebar from './components/Sidebar/Sidebar';
```

### 3. Backend tidak bisa dijalankan

**Error**: `Error: Cannot find module 'express'`

**Solusi**:
Backend menggunakan CommonJS. Pastikan dependencies terinstall:
```powershell
npm install express cors
```

Atau jalankan dengan node:
```powershell
node backend/server.js
```

### 4. Port 3000 atau 5000 sudah digunakan

**Error**: `Port 3000 is already in use`

**Solusi**:
Edit port di `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3001, // Ganti port
  },
});
```

Atau di `backend/server.js`:
```javascript
const PORT = 5001; // Ganti port
```

### 5. Assets/Images tidak muncul

**Error**: Gambar tidak tampil, 404 error

**Solusi**:
- Pastikan file ada di `public/assets/`
- Path harus dimulai dengan `/` contoh: `/assets/frame/logo.png`
- Restart dev server setelah menambah assets baru

**Quick fix**: Gunakan placeholder sementara:
```tsx
<img 
  src="/assets/frame/logo.png" 
  alt="Logo"
  onError={(e) => {
    e.currentTarget.src = 'https://via.placeholder.com/60';
  }}
/>
```

### 6. TypeScript errors

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solusi**:
Pastikan tipe data sesuai di `src/services/dummyData.ts`. Atau tambahkan type assertion:
```typescript
const data = apiResponse as SensorData;
```

### 7. Recharts tidak render

**Error**: Chart tidak muncul atau error

**Solusi**:
- Pastikan data tidak kosong
- Check console untuk error
- Tambahkan defensive check:
```tsx
{data && data.length > 0 ? (
  <LineChart data={data}>...</LineChart>
) : (
  <p>No data available</p>
)}
```

### 8. CORS Error saat fetch backend

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solusi**:
Backend sudah include cors middleware. Pastikan backend running dan URL benar di `api.service.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

### 9. Styling tidak muncul

**Error**: Component tidak punya styling

**Solusi**:
- Import CSS file di component
- Check apakah ada typo di className
- Pastikan CSS file ada di folder yang sama

### 10. Build error

**Error**: Build gagal saat `npm run build`

**Solusi**:
```powershell
# Clear cache
rm -r node_modules/.vite
rm -r dist

# Build ulang
npm run build
```

## 🔍 Debugging Tips

### Check Browser Console
```
F12 → Console tab
```
Lihat error messages untuk clue debugging.

### Check Network Tab
```
F12 → Network tab
```
Lihat apakah API calls berhasil atau gagal.

### React Developer Tools
Install extension:
- Chrome: React Developer Tools
- Firefox: React DevTools

### Check Backend Logs
Terminal yang menjalankan backend akan show request logs.

## ⚡ Performance Issues

### Dashboard lambat
- Reduce data points di historical charts
- Optimize images (compress, use WebP)
- Add lazy loading untuk images

### Too many re-renders
- Check useEffect dependencies
- Use React.memo untuk components yang sering re-render
- Optimize context updates

## 🐛 Known Issues

### 1. Hot Module Reload (HMR) tidak work
Restart dev server: `Ctrl+C` lalu `npm run dev` lagi

### 2. Vite serve stuck
Kill process dan run ulang:
```powershell
# Find process
Get-Process -Name node

# Kill if needed
Stop-Process -Name node -Force

# Run dev ulang
npm run dev
```

## 📝 Development Best Practices

### 1. Selalu check console
Jangan abaikan warnings di console, fix immediately.

### 2. Use TypeScript properly
Jangan gunakan `any` type, define proper interfaces.

### 3. Test incrementally
Test setiap perubahan sebelum lanjut ke fitur berikutnya.

### 4. Git commits
Commit frequently dengan message yang jelas:
```
git commit -m "feat: add temperature card component"
git commit -m "fix: resolve CORS issue in backend"
```

## 🆘 Still Having Issues?

### Check Documentation
1. `README.md` - Overview
2. `QUICKSTART.md` - Quick setup
3. `PROJECT_STRUCTURE.md` - File structure
4. `FIREBASE_INTEGRATION.md` - Firebase guide
5. `ASSETS_GUIDE.md` - Assets setup

### Useful Commands

```powershell
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Clear all cache
npm cache clean --force
```

### Debug Mode

Run with verbose logging:
```powershell
# Frontend
npm run dev -- --debug

# Backend
node backend/server.js
```

## 💡 Tips untuk Production

1. **Environment Variables**: Jangan commit file `.env` ke git
2. **Build Optimization**: Run `npm run build` dan test di `npm run preview`
3. **Error Handling**: Tambahkan proper error boundaries
4. **Loading States**: Tambahkan loading indicators
5. **Error Messages**: User-friendly error messages

---

**Masih ada masalah? Check error message carefully dan Google it! 🔍**
