# ⚠️ UPDATED STRATEGY: API Keys in Production

## Perubahan Strategi (9 Desember 2025)

**MASALAH DITEMUKAN:**
- File yang di-ignore tidak ter-deploy ke GitHub Pages
- Build akan gagal karena missing `apiConfig.ts`

**SOLUSI BARU:**
File `apiConfig.ts` **SEKARANG DI-COMMIT** ke GitHub, tapi dengan strategi hybrid:

### 🔄 Hybrid Strategy: Environment Variables + Fallback

```typescript
// apiConfig.ts akan di-commit dengan values yang aman
export const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || 'FALLBACK_VALUE';
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'FALLBACK_VALUE',
  // ...
};
```

### 📊 Keamanan:

**❓ Apakah API keys aman di-expose di client-side code?**

1. **Firebase API Keys:**
   - ✅ **AMAN** untuk di-expose di client-side
   - Firebase menggunakan **Security Rules** untuk proteksi
   - API key hanya untuk identifikasi project, bukan authentication
   - [Firebase Official Docs](https://firebase.google.com/docs/projects/api-keys)

2. **Gemini API Key:**
   - ⚠️ **PERLU HATI-HATI**
   - Sebaiknya gunakan server-side proxy untuk production
   - Untuk testing/development, masih acceptable
   - Set quota limits di Google Cloud Console

### 🚀 Deployment Workflow:

#### Development (Local):
```bash
npm run dev
# Menggunakan fallback values dari apiConfig.ts
```

#### Production (GitHub Pages):
```bash
npm run build
# Vite akan inline semua imports saat build
# API keys akan ter-bundle di dist/

npm run deploy
# Deploy dist/ folder ke GitHub Pages
```

### ✅ Hasil Akhir:

**File `apiConfig.ts` sekarang:**
- ✅ Di-commit ke GitHub (tidak di-ignore lagi)
- ✅ Berisi API keys yang akan digunakan di production
- ✅ Support environment variables override
- ✅ GitHub Pages build akan SUCCESS
- ✅ Website akan BERFUNGSI di GitHub Pages

### 🔒 Keamanan Tambahan:

Untuk keamanan lebih baik di production:

1. **Rate Limiting:**
   - Set di Google Cloud Console
   - Limit requests per day/minute

2. **API Restrictions:**
   - Restrict ke domain GitHub Pages Anda
   - Settings → Credentials → API restrictions

3. **Firebase Security Rules:**
   - Sudah aktif di RTDB & Firestore
   - Hanya authenticated users bisa write

### 📝 Catatan Penting:

**Firebase Keys:**
- Public exposure is expected dan aman
- Proteksi ada di Security Rules, bukan API key

**Gemini Keys:**
- Untuk production app, sebaiknya pakai server-side proxy
- Untuk project akademik/demo, direct client-side acceptable
- Monitor usage di Google AI Studio

---

**Kesimpulan:** 
Website di GitHub Pages **AKAN BERFUNGSI** karena `apiConfig.ts` sekarang di-commit dengan semua API keys yang diperlukan.
