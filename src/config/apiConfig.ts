/**
 * ============================================================================
 * FIREBASE & GEMINI API CONFIGURATION
 * ============================================================================
 * 
 * DEPLOYMENT STRATEGY:
 * This file IS committed to GitHub and will be deployed to GitHub Pages.
 * 
 * SECURITY NOTES:
 * - Firebase API keys are SAFE to expose (protected by Security Rules)
 * - Gemini API key: Set quota limits & domain restrictions in Google Cloud
 * - For maximum security, use environment variables (optional)
 * 
 * See DEPLOYMENT_STRATEGY.md for details.
 * ============================================================================
 */

// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================

/**
 * Firebase configuration
 * 
 * These values are safe to expose in client-side code.
 * Firebase uses security rules to protect your data.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyB8R3vXhUCjOw5ZgdE85QLMNnvywxRsk9g',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'growthbox-16298.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://growthbox-16298-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'growthbox-16298',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'growthbox-16298.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '536365471612',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:536365471612:web:ab69201b036e53231a36f9',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-JMBHRLQ8YF',
};

// ============================================================================
// GEMINI AI CONFIGURATION
// ============================================================================

/**
 * Gemini API Key
 * 
 * For production (GitHub Pages), this will be injected via environment variables from GitHub Secrets.
 * For local development, use a placeholder or add your key to .env.local file.
 * 
 * SECURITY: The real API key is stored in GitHub Secrets and NOT committed to the repository.
 */
export const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

/**
 * Gemini Model Configuration
 * 
 * Available models:
 * - gemini-1.5-flash-latest (Gemini 1.5 Flash - Latest stable version, recommended)
 * - gemini-1.5-flash (Gemini 1.5 Flash - Stable, fast)
 * - gemini-1.5-flash-8b (Gemini 1.5 Flash 8B - Lightweight)
 * - gemini-1.5-pro-latest (Gemini 1.5 Pro - Most capable)
 * - gemini-2.0-flash-exp (Gemini 2.0 Flash - Experimental)
 * - gemini-pro (Gemini Pro - Standard, older)
 */
export const geminiModel = 'gemini-2.5-flash'; // Using latest stable Flash model

/**
 * Gemini API Endpoint
 * Automatically uses the configured model
 */
export const geminiApiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;
