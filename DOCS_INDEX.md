# 📚 Documentation Index

Selamat datang! Ini adalah index dokumentasi lengkap untuk Smart Greenhouse Dashboard.

## 🚀 Mulai Dari Sini

**Pertama kali setup?** Baca dalam urutan ini:

1. **[QUICKSTART.md](./QUICKSTART.md)** ⭐ START HERE!
   - Panduan cepat install & run
   - Setup assets
   - Kustomisasi dasar

2. **[README.md](./README.md)**
   - Overview project
   - Fitur-fitur
   - Tech stack
   - Cara menjalankan

3. **[PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)** 🎉
   - Summary lengkap apa yang sudah dibuat
   - Checklist before development
   - Final steps

## 📖 Dokumentasi Detail

### Structure & Architecture
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**
  - Struktur folder lengkap
  - Component mapping (Frame 1-8)
  - File penting untuk edit
  - Naming conventions

### Integration Guides
- **[FIREBASE_INTEGRATION.md](./FIREBASE_INTEGRATION.md)**
  - Setup Firebase
  - Database structure
  - Security rules
  - Code examples

- **[ASSETS_GUIDE.md](./ASSETS_GUIDE.md)**
  - Assets yang dibutuhkan
  - Format & ukuran
  - Cara menambahkan
  - Optimasi images

### Troubleshooting
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
  - Common issues & solutions
  - Debugging tips
  - Performance optimization
  - Best practices

## 🎯 Quick Links by Task

### "Saya mau mulai development"
→ [QUICKSTART.md](./QUICKSTART.md)

### "Saya mau tahu struktur projectnya"
→ [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### "Saya mau integrasikan Firebase"
→ [FIREBASE_INTEGRATION.md](./FIREBASE_INTEGRATION.md)

### "Saya mau tambahkan assets"
→ [ASSETS_GUIDE.md](./ASSETS_GUIDE.md)

### "Ada error/masalah"
→ [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### "Mau lihat summary lengkap"
→ [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)

## 📁 File Configuration

```
.env.example          - Template environment variables
.prettierrc           - Code formatting rules
.gitignore            - Files to ignore in git
package.json          - Dependencies & scripts
tsconfig.json         - TypeScript configuration
vite.config.ts        - Vite bundler config
```

## 💻 Source Code Navigation

```
src/
├── components/       - UI Components
│   ├── Cards/       - Dashboard cards (Frame 1-8)
│   ├── Sidebar/     - Navigation sidebar
│   └── PlantInfo/   - Plant information display
│
├── pages/           - Page components
│   ├── Dashboard/   - Main dashboard page
│   ├── ManualControl/ - Device control page
│   └── About/       - About page
│
├── context/         - State management
│   └── DashboardContext.tsx - Main context
│
├── services/        - Business logic
│   ├── api.service.ts   - API calls
│   └── dummyData.ts     - Dummy data (edit this!)
│
└── App.tsx          - Main app component
```

## 🎨 Design System

### Colors
- Primary Green: `#4a9d5f`
- Background Cream: `#f5f0e8`
- Text Dark: `#2c3e50`
- Text Light: `#7f8c8d`

### Typography
- Font: Poppins (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Components
- Cards: Rounded 16px, shadow, hover effects
- Sidebar: 80px width, fixed position
- Layout: Responsive grid

## 🔧 Development Commands

```powershell
npm install          # Install dependencies
npm run dev          # Run frontend (port 3000)
npm run server       # Run backend (port 5000)
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📊 Component Reference

| Frame | Component | Location | Description |
|-------|-----------|----------|-------------|
| 1 | TemperatureCard | `components/Cards/` | Temperature display |
| 2 | WindSpeedCard | `components/Cards/` | Wind speed display |
| 3 | HumidityCard | `components/Cards/` | Air humidity gauge |
| 4 | SoilMoistureCard | `components/Cards/` | Soil moisture gauge |
| 5 | WaterTankCard | `components/Cards/` | Water tank indicator |
| 6 | LightIntensityCard | `components/Cards/` | Light intensity |
| 7 | LuxHistoryChart | `components/Cards/` | Historical lux chart |
| 8 | RpmHistoryChart | `components/Cards/` | Historical RPM chart |

## 🔗 External Resources

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Vite Docs](https://vitejs.dev/)
- [Recharts Docs](https://recharts.org/)
- [Firebase Docs](https://firebase.google.com/docs)

## ✅ Checklist Development

### Phase 1: Setup
- [ ] Install dependencies
- [ ] Add assets (logo, icons, images)
- [ ] Run backend & frontend
- [ ] Test all pages

### Phase 2: Customization
- [ ] Edit data dummy
- [ ] Customize colors
- [ ] Update content
- [ ] Test responsiveness

### Phase 3: Integration
- [ ] Setup Firebase
- [ ] Update API service
- [ ] Test real-time data
- [ ] Error handling

### Phase 4: Production
- [ ] Optimize images
- [ ] Build project
- [ ] Test production build
- [ ] Deploy

## 💡 Tips

1. **Read error messages carefully** - Most issues have clear error messages
2. **Check browser console** - Always check for JavaScript errors
3. **Use TypeScript** - It will catch errors before runtime
4. **Test incrementally** - Test after each change
5. **Read documentation** - All answers are in the docs

## 📞 Getting Help

1. Check relevant documentation file
2. Look at `TROUBLESHOOTING.md` for common issues
3. Google the specific error message
4. Check component code comments
5. Review similar examples in the codebase

---

## 🎉 You're Ready!

Pilih dokumentasi yang sesuai dan mulai development. Semua yang Anda butuhkan sudah ada di sini!

**Happy Coding! 🌱**
