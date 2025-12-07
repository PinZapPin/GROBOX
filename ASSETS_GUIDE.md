# Panduan Menambahkan Assets

## Folder Assets yang Dibutuhkan

Tempatkan file-file berikut di folder `public/assets/`:

### 1. Frame Icons (`/assets/frame/`)

File gambar yang dibutuhkan:
- `logo.png` - Logo proyek (ukuran 60x60px, format PNG dengan background transparan)
- `plant.png` - Gambar tanaman Dieffenbachia (ukuran ~300x400px)
- `temperature.png` - Icon termometer
- `wind.png` - Icon angin
- `humidity.png` - Icon kelembaban udara
- `soil.png` - Icon kelembaban tanah
- `water.png` - Icon tangki air
- `light.png` - Icon cahaya/matahari
- `chart.png` - Icon grafik
- `fan.png` - Icon kipas

### 2. Sidebar Icons (`/assets/sidebar/`)

File gambar yang dibutuhkan:
- `dashboard.png` - Icon dashboard (ukuran 28x28px)
- `manual-control.png` - Icon kontrol manual
- `about.png` - Icon info/about
- `info.png` - Icon informasi kecil

### 3. Font Poppins (`/assets/font/`)

Sudah ada file `OFL.txt`. Tambahkan font Poppins jika ingin menggunakan font lokal:
- `Poppins-Regular.ttf`
- `Poppins-Medium.ttf`
- `Poppins-SemiBold.ttf`
- `Poppins-Bold.ttf`

**Catatan**: Saat ini sudah menggunakan Google Fonts, jadi font lokal opsional.

## Cara Menambahkan Assets

1. **Buat folder di public/**:
   ```
   public/
   ├── assets/
   │   ├── frame/
   │   ├── sidebar/
   │   └── font/
   ```

2. **Copy assets Anda** ke folder yang sesuai

3. **Format yang Disarankan**:
   - Logo & Icons: PNG dengan background transparan
   - Plant Image: PNG atau JPG
   - Ukuran file: < 500KB per file untuk performa optimal

## Alternatif Jika Belum Punya Assets

### Gunakan Placeholder Sementara

Anda bisa menggunakan icon dari library atau placeholder:

1. **Install React Icons** (opsional):
   ```powershell
   npm install react-icons
   ```

2. **Gunakan emoji atau unicode** sebagai placeholder sementara

3. **Generate icon online** dari:
   - https://www.flaticon.com/
   - https://iconscout.com/
   - https://icons8.com/

## Background Gradient

Background gradient sudah diset di CSS:
- Dashboard: `linear-gradient(135deg, #e8f5e9 0%, #ffffff 50%, #f1f8e9 100%)`
- Sidebar: Solid color `#f5f0e8` (krem)

Jika Anda punya background image khusus, tambahkan di:
```css
.dashboard-page {
  background-image: url('/assets/frame/background.png');
  background-size: cover;
}
```

## Optimasi Image

Untuk performa terbaik:
1. Compress images menggunakan TinyPNG atau ImageOptim
2. Gunakan format WebP untuk browser modern
3. Lazy load images jika banyak
4. Gunakan SVG untuk icons jika memungkinkan
