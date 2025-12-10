import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  const tools = [
    { name: 'React', icon: '/assets/Logo/html.png', category: 'Frontend' },
    { name: 'TypeScript', icon: '/assets/Logo/TS.png', category: 'Frontend' },
    { name: 'Firebase', icon: '/assets/Logo/firebase.png', category: 'Backend' },
    { name: 'Python', icon: '/assets/Logo/py.png', category: 'IoT' },
    { name: 'C++', icon: '/assets/Logo/cpp.png', category: 'IoT' },
    { name: 'Figma', icon: '/assets/Logo/figma.png', category: 'Design' },
    { name: 'VS Code', icon: '/assets/Logo/VSC.png', category: 'Development' },
    { name: 'GitHub', icon: '/assets/Logo/gith.png', category: 'Version Control' },
  ];

  return (
    <div className="about-page">
      <header className="page-header">
        <h1 className="page-title">About</h1>
        <p className="page-subtitle">Smart Greenhouse Monitoring System</p>
      </header>

      <div className="about-content">
        <div className="about-section">
          <h2 className="section-title">Tentang Proyek</h2>
          <p className="section-text">
            GROBOX adalah sistem monitoring greenhouse berbasis IoT yang dikembangkan untuk 
            memantau dan mengoptimalkan kondisi pertumbuhan tanaman Aglaonema variagata. 
            Sistem ini mengintegrasikan sensor-sensor canggih dengan dashboard web interaktif 
            yang memungkinkan monitoring real-time dari berbagai parameter lingkungan seperti 
            suhu, kelembaban, intensitas cahaya, kelembaban tanah, dan kecepatan angin.
          </p>
          <p className="section-text">
            Proyek ini merupakan hasil kolaborasi dari kelompok 30 yang menggabungkan keahlian 
            dalam bidang elektronika, pemrograman, dan sistem kontrol untuk menciptakan solusi 
            pertanian pintar yang efisien dan user-friendly.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">Fitur Utama</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img src="/assets/frame/tempIcon.png" alt="Temperature" className="feature-icon" />
              <h3>Monitoring Suhu & Kelembaban</h3>
              <p>Pemantauan real-time suhu dan kelembaban udara dengan visualisasi data historis</p>
            </div>
            <div className="feature-card">
              <img src="/assets/frame/vpdIcon.png" alt="VPD" className="feature-icon" />
              <h3>Perhitungan VPD</h3>
              <p>Vapor Pressure Deficit untuk optimalisasi pertumbuhan tanaman</p>
            </div>
            <div className="feature-card">
              <img src="/assets/frame/lightIcon.png" alt="Light" className="feature-icon" />
              <h3>Kontrol Pencahayaan</h3>
              <p>Monitoring intensitas cahaya dan durasi penyalaan lampu grow light</p>
            </div>
            <div className="feature-card">
              <img src="/assets/frame/soilmoistureIcon.png" alt="Soil" className="feature-icon" />
              <h3>Sensor Kelembaban Tanah</h3>
              <p>Pemantauan kelembaban tanah dengan sistem pompa otomatis</p>
            </div>
            <div className="feature-card">
              <img src="/assets/frame/fanIcon.png" alt="Fan" className="feature-icon" />
              <h3>Sistem Ventilasi</h3>
              <p>Kontrol otomatis dan manual untuk 4 kipas exhaust dengan monitoring RPM</p>
            </div>
            <div className="feature-card">
              <img src="/assets/frame/watercapIcon.png" alt="Water" className="feature-icon" />
              <h3>Monitoring Air</h3>
              <p>Pemantauan level air pada reservoir dengan indikator visual</p>
            </div>
            <div className="feature-card">
              <img src="/assets/gemini-color.png" alt="AI" className="feature-icon" />
              <h3>AI Assistant - Windy</h3>
              <p>Asisten AI powered by Gemini untuk konsultasi perawatan tanaman</p>
            </div>
            <div className="feature-card">
              <img src="/assets/frame/pumpIcon.png" alt="Control" className="feature-icon" />
              <h3>Kontrol Manual</h3>
              <p>Interface intuitif untuk mengontrol semua perangkat secara manual</p>
            </div>
          </div>
        </div>

        <div className="about-section tools-section">
          <h2 className="section-title">Tools & Technologies</h2>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div key={index} className="tool-card">
                <img src={tool.icon} alt={tool.name} className="tool-icon" />
                <h4>{tool.name}</h4>
                <span className="tool-category">{tool.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2 className="section-title">Arsitektur Sistem</h2>
          <p className="section-text">
            Sistem GROBOX menggunakan arsitektur modern dengan pemisahan yang jelas antara 
            layer hardware, data, dan presentation:
          </p>
          <ul className="feature-list">
            <li><strong>Hardware Layer:</strong> Sensor suhu/kelembaban (DHT22), sensor cahaya (BH1750), 
            sensor kelembaban tanah, sensor kecepatan angin, ESP32/Arduino sebagai microcontroller</li>
            <li><strong>Data Layer:</strong> Firebase Realtime Database untuk streaming data sensor, 
            Firestore untuk penyimpanan data historis dengan timestamp</li>
            <li><strong>Application Layer:</strong> Web dashboard berbasis React + TypeScript dengan 
            state management menggunakan Context API</li>
            <li><strong>AI Layer:</strong> Integrasi Google Gemini API untuk fitur chatbot Windy 
            yang dapat menjawab pertanyaan seputar perawatan tanaman</li>
          </ul>
        </div>

        <div className="about-section team-section">
          <h2 className="section-title">Tim Pengembang</h2>
          <div className="team-info">
            <img src="/assets/frame/logo.png" alt="GROBOX Logo" className="team-logo" />
            <div className="team-details">
              <p className="team-description">
                Proyek ini dikembangkan sebagai bagian dari mata kuliah <strong>Desain Proyek 2</strong>, 
                Semester 7, Program Studi <strong>Teknik Elektro 2022</strong>.
              </p>
              <p className="team-leader">
                <strong>Project Lead:</strong> Davin Nazhif Wilviadli
              </p>
              <p className="team-name">
                <strong>Kelompok 30</strong> - Smart Greenhouse Monitoring System
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <p>&copy; 2024 GROBOX - Smart Greenhouse Monitoring System</p>
        <p>Developed by <strong>Davin Nazhif Wilviadli</strong> & Kelompok 30</p>
        <p>Teknik Elektro 2022 - Desain Proyek 2</p>
      </footer>
    </div>
  );
};

export default AboutPage;
