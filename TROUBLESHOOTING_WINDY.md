# Troubleshooting Windy AI Assistant

## Setup API Key Gemini

### 1. Verifikasi API Key
API key sudah dikonfigurasi di `src/config/apiConfig.ts`:
```typescript
export const geminiApiKey = 'AIzaSyDxrTAyPsbmoMnvveO4y3KcqKlBz3EoPvk';
```

### 2. Model yang Digunakan
Saat ini menggunakan **Gemini 1.5 Flash Latest** (`gemini-1.5-flash-latest`):
- Model terbaru dan stabil dari Gemini Flash
- Lebih cepat daripada Gemini Pro
- Cocok untuk real-time responses

### 3. Cara Cek Apakah Windy Bekerja

#### Langkah 1: Buka Browser Console
1. Tekan `F12` atau klik kanan → Inspect
2. Pilih tab **Console**

#### Langkah 2: Klik Tombol Windy AI
Tombol ungu di pojok kanan bawah

#### Langkah 3: Ketik Pertanyaan
Coba ketik: "Hello Windy"

#### Langkah 4: Lihat Console Logs
Anda akan melihat log seperti ini jika berhasil:
```
[Windy] API Configuration: {
  hasApiKey: true,
  keyLength: 39,
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
  keyPrefix: "AIzaSyDxrT..."
}
[Windy] Fetching Firebase data...
[Windy] Fetched RTDB status for group12: {...}
[Windy] Fetched RTDB status for group3: {...}
[Windy] Fetched RTDB status for group30: {...}
[Windy] Fetched RTDB status for group6&35: {...}
[Windy] Fetched 15 historical records for group30
[Windy] Fetched 15 historical records for group3
[Windy] All Firebase data fetched successfully
[Windy] Sending prompt to Gemini API...
[Windy] Prompt length: 2547 characters
[Windy] Making API request...
[Windy] API response status: 200 OK
[Windy] API response data: {...}
[Windy] Response received successfully
```

## Troubleshooting Common Issues

### Issue 1: Windy Tidak Merespon (Mock Response)

**Gejala:**
- Chat menampilkan respons generik
- Console menunjukkan: `[Windy] Gemini API key not configured. Using mock response.`

**Solusi:**
1. Pastikan API key benar di `src/config/apiConfig.ts`
2. Restart development server: `npm run dev`
3. Hard refresh browser: `Ctrl + Shift + R`

### Issue 2: API Error 400 (Bad Request)

**Gejala:**
```
[Windy] API Error Response: {
  "error": {
    "code": 400,
    "message": "API key not valid"
  }
}
```

**Solusi:**
1. Verifikasi API key di [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Pastikan API key belum expired
3. Cek quota di Google Cloud Console

### Issue 3: API Error 404 (Model Not Found)

**Gejala:**
```
[Windy] API response status: 404 Not Found
```

**Solusi:**
Model name mungkin salah. Coba ganti di `src/config/apiConfig.ts`:
```typescript
// Pilih salah satu:
export const geminiModel = 'gemini-1.5-flash-latest'; // Recommended
// atau
export const geminiModel = 'gemini-1.5-flash';
// atau
export const geminiModel = 'gemini-1.5-pro-latest';
```

### Issue 4: CORS Error

**Gejala:**
```
Access to fetch at 'https://generativelanguage.googleapis.com/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solusi:**
Ini tidak seharusnya terjadi karena Gemini API mendukung CORS. Jika terjadi:
1. Pastikan menggunakan HTTPS di production
2. Cek apakah ada browser extension yang memblok request
3. Coba di browser mode incognito

### Issue 5: Firebase Data Tidak Ter-fetch

**Gejala:**
```
[Windy] Error fetching RTDB status for group12: ...
```

**Solusi:**
1. Pastikan Firebase config benar di `src/config/apiConfig.ts`
2. Cek Firebase Realtime Database Rules
3. Pastikan path `status/group12`, `status/group3`, dll exist

### Issue 6: Timeout / Slow Response

**Gejala:**
- Windy membutuhkan waktu lama (>10 detik) untuk merespon

**Penyebab:**
- Fetching data dari 6 sumber Firebase (4 RTDB + 2 Firestore)
- Gemini API processing large context

**Solusi:**
Kurangi `FIRESTORE_HISTORY_LIMIT` di `src/services/geminiService.ts`:
```typescript
const FIRESTORE_HISTORY_LIMIT = 10; // Dari 15 jadi 10
```

## Testing API Key Manually

### Cara 1: Curl Test (PowerShell)
```powershell
$apiKey = "AIzaSyDxrTAyPsbmoMnvveO4y3KcqKlBz3EoPvk"
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=$apiKey"

$body = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = "Say hello"
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri $url -Method POST -Body $body -ContentType "application/json"
```

**Expected Response:**
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Hello! 👋 How can I help you today?\n"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP"
    }
  ]
}
```

### Cara 2: Browser DevTools
1. Buka [Google AI Studio](https://makersuite.google.com/)
2. Login dengan Google account yang punya API key
3. Coba generate response
4. Jika berhasil, API key valid

## Model Comparison

| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| `gemini-1.5-flash-latest` | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | **Recommended** - Real-time chat |
| `gemini-1.5-flash` | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | Stable version |
| `gemini-1.5-flash-8b` | ⚡⚡⚡⚡ Fastest | ⭐⭐ OK | Simple questions only |
| `gemini-1.5-pro-latest` | ⚡⚡ Medium | ⭐⭐⭐⭐⭐ Best | Complex analysis |
| `gemini-pro` | ⚡⚡ Medium | ⭐⭐⭐ Good | Legacy, not recommended |

## Configuration Files Reference

### `src/config/apiConfig.ts`
```typescript
// Gemini Configuration
export const geminiApiKey = 'AIzaSyDxrTAyPsbmoMnvveO4y3KcqKlBz3EoPvk';
export const geminiModel = 'gemini-1.5-flash-latest';
export const geminiApiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;
```

### `src/services/geminiService.ts`
```typescript
const GEMINI_API_KEY = geminiApiKey; // Imported from apiConfig
const GEMINI_API_ENDPOINT = geminiApiEndpoint; // Imported from apiConfig
const FIRESTORE_HISTORY_LIMIT = 15; // Number of historical records
```

## Debug Checklist

Jika Windy tidak bekerja, cek satu per satu:

- [ ] API key benar di `apiConfig.ts`
- [ ] Model name valid (`gemini-1.5-flash-latest`)
- [ ] Firebase config benar
- [ ] Browser console tidak ada error merah
- [ ] Internet connection OK
- [ ] Development server running (`npm run dev`)
- [ ] Browser cache cleared (Ctrl + Shift + R)

## Contact & Support

Jika masih bermasalah:
1. Screenshot console errors
2. Salin error message lengkap
3. Cek apakah Firebase data bisa diakses manual
4. Test API key dengan curl command di atas

---

**Last Updated:** 2024
**Windy Version:** 1.0.0
**Gemini Model:** gemini-1.5-flash-latest
