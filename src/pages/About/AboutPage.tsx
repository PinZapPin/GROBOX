import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
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
            Smart Greenhouse Monitoring System adalah sistem IoT yang dirancang untuk memantau
            dan mengontrol kondisi lingkungan greenhouse secara real-time. Sistem ini menggunakan
            berbagai sensor untuk mengukur parameter penting seperti suhu, kelembaban udara,
            kelembaban tanah, kecepatan angin, dan intensitas cahaya.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">Fitur Utama</h2>
          <ul className="feature-list">
            <li>Monitoring real-time suhu dan kelembaban</li>
            <li>Kontrol otomatis sistem ventilasi (kipas)</li>
            <li>Monitoring tingkat air pada tangki</li>
            <li>Pengukuran intensitas cahaya</li>
            <li>Visualisasi data historis</li>
            <li>Kontrol manual perangkat</li>
          </ul>
        </div>

        <div className="about-section">
          <h2 className="section-title">Teknologi</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Frontend</h3>
              <p>React + TypeScript</p>
            </div>
            <div className="tech-item">
              <h3>Backend</h3>
              <p>Node.js + Express</p>
            </div>
            <div className="tech-item">
              <h3>Database</h3>
              <p>Firebase Realtime DB</p>
            </div>
            <div className="tech-item">
              <h3>IoT Platform</h3>
              <p>ESP32 / Arduino</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2 className="section-title">Tim Pengembang</h2>
          <p className="section-text">
            Proyek ini dikembangkan sebagai bagian dari tugas Desain Proyek 2, 
            Semester 7, Program Studi Teknik Elektro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
