/**
 * ============================================================================
 * FIREBASE & GEMINI API CONFIGURATION - EXAMPLE TEMPLATE
 * ============================================================================
 * 
 * INSTRUCTIONS:
 * 1. Copy this file and rename it to: apiConfig.ts
 * 2. Replace the placeholder values with your actual API keys
 * 3. The real apiConfig.ts is ignored by Git for security
 * 
 * ============================================================================
 */

// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================

export const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID-default-rtdb.REGION.firebasedatabase.app',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};

// ============================================================================
// GEMINI AI CONFIGURATION
// ============================================================================

/**
 * Gemini API Key
 * 
 * To get your API key:
 * 1. Visit: https://makersuite.google.com/app/apikey
 * 2. Sign in with your Google account
 * 3. Click "Create API Key"
 * 4. Replace the value below with your actual key
 */
export const geminiApiKey = 'YOUR_GEMINI_API_KEY_HERE';

/**
 * Gemini API Endpoint
 */
export const geminiApiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
