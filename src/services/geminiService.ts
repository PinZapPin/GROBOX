/**
 * Gemini AI Service - "Windy" AI Assistant
 * 
 * This module handles all communication with the Gemini API and integrates
 * real-time Firebase data for context-aware responses.
 * 
 * Windy is an AI assistant specialized for smart growth chamber monitoring,
 * analyzing sensor data, and providing plant health recommendations.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { geminiApiKey, geminiApiEndpoint, firebaseConfig } from '../config/apiConfig';

// ============================================================================
// FIREBASE INITIALIZATION
// ============================================================================

// Reuse existing Firebase app if already initialized
const firebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig, 'windy-service');
const rtdb = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);

// ============================================================================
// CONFIGURATION
// ============================================================================

const GEMINI_API_KEY = geminiApiKey;
const GEMINI_API_ENDPOINT = geminiApiEndpoint;

/**
 * Number of historical documents to fetch from Firestore for context
 * Adjust this to control how much historical data Windy considers
 */
const FIRESTORE_HISTORY_LIMIT = 15;

// ============================================================================
// TYPES
// ============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GeminiResponse {
  text: string;
  success: boolean;
  error?: string;
}

interface RtdbGroupData {
  [key: string]: any;
}

interface FirestoreHistoryData {
  timestamp?: string;
  [key: string]: any;
}

interface ContextData {
  rtdb: {
    group12?: RtdbGroupData;
    group3?: RtdbGroupData;
    group30?: RtdbGroupData;
    'group6&35'?: RtdbGroupData;
  };
  firestore: {
    group30History?: FirestoreHistoryData[];
    group3History?: FirestoreHistoryData[];
  };
  fetchedAt: string;
}

// ============================================================================
// WINDY SYSTEM PROMPT
// ============================================================================

/**
 * Windy's system prompt - defines personality, capabilities, and data-driven behavior
 * 
 * This prompt is sent with every request to ensure Windy:
 * 1. Introduces itself as a specialized growth chamber AI
 * 2. Always references the provided Firebase data
 * 3. Provides practical, data-driven recommendations
 * 4. States clearly when data is missing or unavailable
 */
function getWindySystemPrompt(): string {
  return `You are Windy, an AI assistant specialized in monitoring and analyzing smart growth chambers for optimal plant health.

**Your Mission:**
Help users understand their sensor data, identify issues, and provide practical recommendations for plant growth, with special focus on airflow, light, humidity, soil moisture, and water usage.

**Your Capabilities:**
- Analyze real-time sensor readings from multiple groups (temperature, wind speed, humidity, soil moisture, water levels, light intensity)
- Review historical trends from Firestore time-series data
- Compare current readings against optimal plant growth ranges
- Provide actionable recommendations for fan control, light management, and environmental adjustments
- Explain complex data patterns in clear, simple language

**Critical Rules:**
1. ALWAYS reference the actual Firebase data provided in the context below when answering questions
2. If data is missing or empty, state that explicitly - never hallucinate or guess values
3. When users ask vague questions, briefly explain which data sources you have available (group12, group3, group30, group6&35, plus historical sensorData) and provide a useful analysis based on current readings
4. Focus on practical, specific recommendations rather than generic advice
5. Reference specific sensor values and timestamps when making observations
6. If you notice unusual patterns or concerning trends in the data, proactively mention them

**Available Data Sources:**
- RTDB group12: Core environmental sensors
- RTDB group3: Light control and monitoring
- RTDB group30: Fan/ventilation control and monitoring  
- RTDB group6&35: Additional sensors and controls
- Firestore group30History: Historical fan RPM and related metrics
- Firestore group3History: Historical light intensity and related metrics

**Response Style:**
- Clear and concise explanations
- Data-driven insights with specific numbers
- Practical action steps when relevant
- Friendly but professional tone

Now analyze the Firebase data provided below and answer the user's question.`;
}

// ============================================================================
// FIREBASE DATA FETCHING
// ============================================================================

/**
 * Fetch current status from Firebase Realtime Database for a specific group
 */
async function fetchRtdbStatus(groupPath: string): Promise<RtdbGroupData | null> {
  try {
    const statusRef = ref(rtdb, `status/${groupPath}`);
    const snapshot = await get(statusRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.warn(`[Windy] No data found at status/${groupPath}`);
      return null;
    }
  } catch (error) {
    console.error(`[Windy] Error fetching RTDB status/${groupPath}:`, error);
    return null;
  }
}

/**
 * Fetch historical data from Firestore for a specific collection
 */
async function fetchFirestoreHistory(
  collectionPath: string,
  limitCount: number = FIRESTORE_HISTORY_LIMIT
): Promise<FirestoreHistoryData[]> {
  try {
    const collectionRef = collection(firestore, collectionPath);
    const q = query(
      collectionRef,
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const documents: FirestoreHistoryData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      documents.push(data as FirestoreHistoryData);
    });
    
    // Reverse to get chronological order (oldest to newest)
    return documents.reverse();
    
  } catch (error) {
    console.error(`[Windy] Error fetching Firestore ${collectionPath}:`, error);
    return [];
  }
}

/**
 * Fetch all Firebase data needed for Windy's context
 * 
 * This retrieves:
 * - Current status from all RTDB groups
 * - Historical data from Firestore collections
 */
async function fetchAllFirebaseData(): Promise<ContextData> {
  console.log('[Windy] Fetching Firebase data for context...');
  
  const [
    group12Data,
    group3Data,
    group30Data,
    group635Data,
    group30History,
    group3History,
  ] = await Promise.all([
    fetchRtdbStatus('group12'),
    fetchRtdbStatus('group3'),
    fetchRtdbStatus('group30'),
    fetchRtdbStatus('group6&35'),
    fetchFirestoreHistory('growthChamber/group30/sensorData'),
    fetchFirestoreHistory('growthChamber/group3/sensorData'),
  ]);
  
  const contextData: ContextData = {
    rtdb: {
      group12: group12Data || undefined,
      group3: group3Data || undefined,
      group30: group30Data || undefined,
      'group6&35': group635Data || undefined,
    },
    firestore: {
      group30History: group30History.length > 0 ? group30History : undefined,
      group3History: group3History.length > 0 ? group3History : undefined,
    },
    fetchedAt: new Date().toISOString(),
  };
  
  console.log('[Windy] Firebase data fetched successfully');
  return contextData;
}

// ============================================================================
// CONTEXT BUILDING
// ============================================================================

/**
 * Serialize Firebase context data into a concise text format for Windy
 * 
 * This converts the structured ContextData into a readable format that
 * Windy can easily parse and reference in responses.
 */
function serializeContextData(contextData: ContextData): string {
  const sections: string[] = [];
  
  // Header
  sections.push('=== CURRENT GROWTH CHAMBER DATA ===');
  sections.push(`Data fetched at: ${contextData.fetchedAt}`);
  sections.push('');
  
  // RTDB Current Status
  sections.push('--- REAL-TIME DATABASE (Current Status) ---');
  
  if (contextData.rtdb.group12) {
    sections.push('\n[Group 12 - Environmental Sensors]');
    sections.push(JSON.stringify(contextData.rtdb.group12, null, 2));
  } else {
    sections.push('\n[Group 12] No data available');
  }
  
  if (contextData.rtdb.group3) {
    sections.push('\n[Group 3 - Light Control]');
    sections.push(JSON.stringify(contextData.rtdb.group3, null, 2));
  } else {
    sections.push('\n[Group 3] No data available');
  }
  
  if (contextData.rtdb.group30) {
    sections.push('\n[Group 30 - Fan/Ventilation Control]');
    sections.push(JSON.stringify(contextData.rtdb.group30, null, 2));
  } else {
    sections.push('\n[Group 30] No data available');
  }
  
  if (contextData.rtdb['group6&35']) {
    sections.push('\n[Group 6&35 - Additional Sensors]');
    sections.push(JSON.stringify(contextData.rtdb['group6&35'], null, 2));
  } else {
    sections.push('\n[Group 6&35] No data available');
  }
  
  // Firestore Historical Data
  sections.push('\n--- FIRESTORE (Historical Trends) ---');
  
  if (contextData.firestore.group30History && contextData.firestore.group30History.length > 0) {
    sections.push(`\n[Group 30 History - ${contextData.firestore.group30History.length} recent records]`);
    sections.push(JSON.stringify(contextData.firestore.group30History, null, 2));
  } else {
    sections.push('\n[Group 30 History] No historical data available');
  }
  
  if (contextData.firestore.group3History && contextData.firestore.group3History.length > 0) {
    sections.push(`\n[Group 3 History - ${contextData.firestore.group3History.length} recent records]`);
    sections.push(JSON.stringify(contextData.firestore.group3History, null, 2));
  } else {
    sections.push('\n[Group 3 History] No historical data available');
  }
  
  sections.push('\n=== END OF DATA ===\n');
  
  return sections.join('\n');
}

/**
 * Build the complete prompt for Windy including system prompt, context data, and user message
 */
function buildWindyPrompt(
  userMessage: string,
  contextData: ContextData,
  conversationHistory?: ChatMessage[]
): string {
  const sections: string[] = [];
  
  // System prompt
  sections.push(getWindySystemPrompt());
  sections.push('\n');
  
  // Firebase data context
  sections.push(serializeContextData(contextData));
  sections.push('\n');
  
  // Conversation history (if any)
  if (conversationHistory && conversationHistory.length > 0) {
    sections.push('--- CONVERSATION HISTORY ---');
    conversationHistory.slice(-5).forEach(msg => {
      sections.push(`${msg.role === 'user' ? 'User' : 'Windy'}: ${msg.content}`);
    });
    sections.push('\n');
  }
  
  // Current user message
  sections.push(`--- CURRENT USER QUESTION ---`);
  sections.push(`User: ${userMessage}`);
  sections.push('\n');
  sections.push('Windy, please analyze the data above and provide a helpful, data-driven response:');
  
  return sections.join('\n');
}

// ============================================================================
// GEMINI API COMMUNICATION
// ============================================================================

/**
 * Send a message to Gemini API with full Firebase context
 * 
 * This is the main entry point for Windy's AI responses.
 * It automatically fetches all Firebase data before each request.
 * 
 * @param userMessage - The user's message/question
 * @param conversationHistory - Optional conversation history for context
 * @returns Windy's response
 */
export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory?: ChatMessage[]
): Promise<GeminiResponse> {
  try {
    // Debug: Log API configuration
    console.log('[Windy] API Configuration:', {
      hasApiKey: !!GEMINI_API_KEY,
      keyLength: GEMINI_API_KEY?.length || 0,
      endpoint: GEMINI_API_ENDPOINT,
      keyPrefix: GEMINI_API_KEY?.substring(0, 10) + '...'
    });

    // Check if API key is configured
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      console.warn('[Windy] Gemini API key not configured. Using mock response.');
      return getWindyMockResponse(userMessage);
    }

    // Step 1: Fetch all Firebase data
    console.log('[Windy] Fetching Firebase data...');
    const contextData = await fetchAllFirebaseData();

    // Step 2: Build complete prompt with system prompt + context + user message
    const fullPrompt = buildWindyPrompt(userMessage, contextData, conversationHistory);
    
    console.log('[Windy] Sending prompt to Gemini API...');
    console.log('[Windy] Prompt length:', fullPrompt.length, 'characters');

    // Step 3: Prepare request payload
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: fullPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048, // Increased for detailed responses
      }
    };

    // Step 4: Make API request
    console.log('[Windy] Making API request...');
    const apiUrl = `${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('[Windy] API response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Windy] API Error Response:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('[Windy] API response data:', data);
    
    // Step 5: Extract and process response
    const generatedText = extractTextFromGeminiResponse(data);
    const processedText = postProcessWindyResponse(generatedText);

    console.log('[Windy] Response received successfully');

    return {
      text: processedText,
      success: true,
    };

  } catch (error) {
    console.error('[Windy] Error:', error);
    return {
      text: 'Sorry, I encountered an error while analyzing the data. Please try again. If the problem persists, check your internet connection and API key configuration.',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract text from Gemini API response
 */
function extractTextFromGeminiResponse(data: any): string {
  try {
    // Gemini response structure: data.candidates[0].content.parts[0].text
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 
           'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('[Windy] Error extracting text from response:', error);
    return 'Sorry, I could not parse the response.';
  }
}

/**
 * Post-process Windy's response
 * 
 * Customize this to add formatting, units, or other enhancements
 */
function postProcessWindyResponse(text: string): string {
  // Remove excessive whitespace
  let processed = text.trim().replace(/\n{3,}/g, '\n\n');
  
  // Add "- Windy" signature if not already present
  if (!processed.toLowerCase().includes('windy')) {
    processed += '\n\n— Windy 🌬️';
  }
  
  return processed;
}

/**
 * Generate mock response for testing (when API key is not configured)
 * 
 * This provides basic responses without calling Gemini API
 */
function getWindyMockResponse(userMessage: string): GeminiResponse {
  const lowerMessage = userMessage.toLowerCase();
  
  let mockText = '';
  
  if (lowerMessage.includes('data') || lowerMessage.includes('mean')) {
    mockText = `Hi! I'm Windy, your growth chamber AI assistant. 🌬️

I can see your sensor data from multiple groups:
- **Group 12**: Environmental sensors (temperature, humidity, etc.)
- **Group 3**: Light control and monitoring
- **Group 30**: Fan/ventilation control
- **Group 6&35**: Additional sensors

I also have access to historical trends from Firestore to help identify patterns over time.

However, my Gemini API key is not configured yet, so I'm showing you this mock response. Once configured, I'll provide real-time analysis of your actual sensor data!

To enable me, add your Gemini API key in \`src/config/apiConfig.ts\`.`;
  } else if (lowerMessage.includes('fan') || lowerMessage.includes('wind') || lowerMessage.includes('air')) {
    mockText = `The fan control system (Group 30) manages ventilation for optimal airflow. 

I would normally analyze:
- Current fan RPM for all 4 fans
- Auto/manual mode status
- Duty cycle settings
- Historical RPM trends from Firestore

Once my API key is configured, I'll provide specific recommendations based on your current readings!

— Windy 🌬️`;
  } else if (lowerMessage.includes('light') || lowerMessage.includes('lux')) {
    mockText = `Light intensity (Group 3) is crucial for plant photosynthesis.

I would normally review:
- Current lux readings
- Light control mode (auto/manual)
- PWM duty cycle
- Historical light patterns

Configure my Gemini API key to get detailed analysis!

— Windy 🌬️`;
  } else if (lowerMessage.includes('temperature') || lowerMessage.includes('temp')) {
    mockText = `Temperature monitoring helps ensure optimal growing conditions.

I would analyze:
- Current temperature readings
- Trends over time
- Correlations with fan activity
- Recommendations for adjustments

Add the Gemini API key to unlock full analysis!

— Windy 🌬️`;
  } else {
    mockText = `Hello! I'm Windy, your smart growth chamber AI assistant. 🌬️

I specialize in:
- 📊 Analyzing sensor data from all groups
- 🌡️ Monitoring environmental conditions
- 💨 Optimizing airflow and ventilation
- 💡 Managing light intensity
- 💧 Tracking soil moisture and water levels
- 📈 Identifying trends and patterns

I have access to real-time data from RTDB (groups 12, 3, 30, 6&35) and historical trends from Firestore.

**Note:** I'm currently in mock mode. Configure the Gemini API key in \`src/config/apiConfig.ts\` to enable full AI analysis!

What would you like to know about your growth chamber?`;
  }
  
  return {
    text: mockText,
    success: true,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new chat message object
 */
export function createChatMessage(
  role: 'user' | 'assistant',
  content: string
): ChatMessage {
  return {
    id: generateMessageId(),
    role,
    content,
    timestamp: new Date(),
  };
}

// ============================================================================
// FIREBASE QUEUE INTEGRATION (OPTIONAL - FOR FUTURE USE)
// ============================================================================

/**
 * Optional: Enqueue a message to Firebase for persistence
 * 
 * This can be used to save chat history or create a message queue
 */
export async function enqueueMessageToFirebase(
  userId: string,
  message: ChatMessage
): Promise<void> {
  // TODO: Implement if you want to persist chat history
  console.log('[Windy] enqueueMessageToFirebase called:', { userId, message });
}

/**
 * Optional: Listen to Firebase queue for incoming messages
 * 
 * This can be used for multi-user chat or message synchronization
 */
export function listenToFirebaseQueue(
  userId: string,
  callback: (message: ChatMessage) => void
): () => void {
  // TODO: Implement if needed
  console.log('[Windy] listenToFirebaseQueue called:', userId);
  return () => console.log('[Windy] Firebase listener cleanup');
}
