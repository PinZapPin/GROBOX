# 🔒 API Security Setup Guide

## Overview

File ini menjelaskan cara mengamankan API keys (Firebase & Gemini) agar tidak terpublish ke GitHub saat push repository.

## ⚠️ PENTING: File Yang Sudah Diamankan

File berikut **SUDAH OTOMATIS DI-IGNORE** dari Git (tidak akan ter-commit/push ke GitHub):

```
src/config/apiConfig.ts  ← File ini berisi API keys asli Anda
```

File ini sudah ditambahkan ke `.gitignore` sehingga **AMAN** dari publish ke public repository.

## 📁 Struktur File Konfigurasi

```
src/config/
├── apiConfig.ts          ← IGNORED by Git (contains real API keys)
└── apiConfig.example.ts  ← Template file (safe to commit)
```

## 🚀 Setup untuk Developer Baru

Jika seseorang clone repository ini, mereka perlu:

1. **Copy file template:**
   ```bash
   cp src/config/apiConfig.example.ts src/config/apiConfig.ts
   ```

2. **Edit `src/config/apiConfig.ts`** dan isi dengan API keys mereka sendiri:
   ```typescript
   export const firebaseConfig = {
     apiKey: 'THEIR_FIREBASE_API_KEY',
     // ... dst
   };

   export const geminiApiKey = 'THEIR_GEMINI_API_KEY';
   ```

## ✅ Verifikasi Keamanan

Untuk memastikan API keys Anda TIDAK akan ter-push ke GitHub:

### 1. Cek `.gitignore`
```bash
cat .gitignore
```

Pastikan ada baris ini:
```
src/config/apiConfig.ts
```

### 2. Test dengan Git Status
```bash
git status
```

File `src/config/apiConfig.ts` **TIDAK BOLEH** muncul dalam daftar changes.

### 3. Cek Staged Files
```bash
git diff --cached --name-only
```

Pastikan `apiConfig.ts` tidak ada dalam daftar.

## 🔐 File Yang Berisi API Keys

Berikut file yang **SUDAH MENGGUNAKAN** konfigurasi terpusat dari `apiConfig.ts`:

1. **Firebase Configuration:**
   - `src/context/DashboardContext.tsx`
   - `src/pages/ManualControl/ManualControlPage.tsx`

2. **Gemini AI Configuration:**
   - `src/services/geminiService.ts`

3. **Asset Paths:**
   - `src/components/AiChat/AiChatButton.tsx`
   - `src/components/AiChat/AiChatPanel.tsx`

## 📝 Isi dari `apiConfig.ts` (Yang DI-IGNORE)

```typescript
// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================
export const firebaseConfig = {
  apiKey: 'AIzaSyBRQuZFv7qBlftLINSFxgGeMo4j2uYAwtQ',
  authDomain: 'despro-43cdc.firebaseapp.com',
  databaseURL: 'https://despro-43cdc-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'despro-43cdc',
  storageBucket: 'despro-43cdc.firebasestorage.app',
  messagingSenderId: '1022318213486',
  appId: '1:1022318213486:web:5e7f4f4307bda6230f697f',
  measurementId: 'G-N2YW51X1Q9',
};

// ============================================================================
// GEMINI AI CONFIGURATION
// ============================================================================
export const geminiApiKey = 'YOUR_GEMINI_API_KEY_HERE'; // TODO: Ganti dengan key asli
export const geminiApiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
```

## 🛡️ Best Practices

### ✅ DO (Lakukan):
- ✅ Gunakan `apiConfig.ts` untuk semua API keys
- ✅ Commit `apiConfig.example.ts` sebagai template
- ✅ Add `apiConfig.ts` ke `.gitignore`
- ✅ Dokumentasikan di README untuk developer baru

### ❌ DON'T (Jangan):
- ❌ Hardcode API keys langsung di component
- ❌ Commit file yang berisi API keys asli
- ❌ Share API keys via chat/email
- ❌ Hapus `apiConfig.ts` dari `.gitignore`

## 🔍 Cara Mendapatkan API Keys

### Firebase API Key:
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Settings → Project Settings → General
4. Scroll ke "Your apps" → Web apps
5. Copy konfigurasi Firebase

### Gemini API Key:
1. Buka [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in dengan Google account
3. Click "Create API Key"
4. Copy API key

## 🚨 Jika API Key Sudah Ter-Commit

Jika tidak sengaja commit API key ke GitHub:

### 1. Revoke API Key Segera
- **Firebase:** Regenerate keys di Firebase Console
- **Gemini:** Delete & create new key di Google AI Studio

### 2. Clean Git History (Optional)
```bash
# Install BFG Repo-Cleaner
# Remove sensitive file from history
bfg --delete-files apiConfig.ts

# Force push (WARNING: rewrites history)
git push --force
```

### 3. Update Local Config
```bash
# Update dengan API key baru
nano src/config/apiConfig.ts
```

## 📞 Support

Jika ada pertanyaan tentang security setup:
1. Baca dokumentasi di `AI_CHAT_README.md`
2. Cek `.gitignore` configuration
3. Verify dengan `git status` sebelum commit

---

**Remember:** 🔒 **NEVER** commit real API keys to version control!
