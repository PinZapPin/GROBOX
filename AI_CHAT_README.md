# AI Chat Feature - Setup Guide

## Overview

The AI Chat feature adds a floating AI assistant powered by Google's Gemini API to your G.R.O.B.O.X dashboard. Users can ask questions about sensor data, get recommendations for optimal settings, and receive assistance with understanding their greenhouse monitoring system.

## Features

- **Floating Chat Button**: Always accessible in the bottom-right corner
- **Chat Panel**: Clean, modern interface with message history
- **Quick Questions**: Pre-defined prompts for common queries
- **Real-time Responses**: AI-powered answers using Gemini API
- **Memory-Only Storage**: Chat history resets on page refresh (no persistent storage)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure the API Key

Open `src/services/geminiService.ts` and replace the placeholder:

```typescript
// Line 15 - Replace with your actual API key
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // TODO: Insert your API key
```

**Option 1: Direct replacement (quick testing)**
```typescript
const GEMINI_API_KEY = 'AIzaSyC...your-actual-key-here';
```

**Option 2: Environment variable (recommended for production)**

1. Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=AIzaSyC...your-actual-key-here
```

2. Update `geminiService.ts`:
```typescript
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
```

3. Add `.env` to `.gitignore` to keep your key secure

### 3. Test the Feature

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the Dashboard or Manual Control page
3. Click the floating Gemini button in the bottom-right corner
4. Try asking a question or clicking a quick question chip
5. Verify you receive AI responses (not mock responses)

## Customization

### Quick Questions

Edit the quick question presets in `src/components/AiChat/AiChatPanel.tsx`:

```typescript
const QUICK_QUESTIONS = [
  "What does this data mean?",
  "Suggest optimal fan settings",
  "Explain today's light pattern",
  "How to improve humidity?",
  // Add your custom questions here
];
```

### System Prompt

Customize the AI's context and behavior in `src/services/geminiService.ts`:

```typescript
function getSystemPrompt(): string {
  return `You are an AI assistant for the G.R.O.B.O.X system...`;
  // Modify this to change the AI's personality and knowledge domain
}
```

### Post-Processing Responses

Add custom formatting to AI responses in `src/services/geminiService.ts`:

```typescript
function postProcessGeminiResponse(text: string): string {
  let processed = text.trim().replace(/\n{3,}/g, '\n\n');
  
  // Add your custom logic here:
  // - Format numbers with units
  // - Add emoji for better UX
  // - Insert links to dashboard sections
  
  return processed;
}
```

### Styling

Modify `src/components/AiChat/AiChat.css` to match your design preferences:

- **Button colors**: `.ai-chat-button` (lines 8-10)
- **Panel colors**: `.ai-chat-header` (line 79)
- **Message bubbles**: `.user-message`, `.assistant-message` (lines 203-214)
- **Typography**: Font sizes and weights throughout

## Firebase Queue Integration (Future)

The service includes placeholder functions for Firebase queue integration:

### `enqueueMessageToFirebase`

Use this to store messages in Firebase Realtime Database or Firestore:

```typescript
export async function enqueueMessageToFirebase(
  userId: string,
  message: ChatMessage
): Promise<void> {
  // TODO: Implement your Firebase write logic
  const db = getDatabase();
  const messageRef = ref(db, `chatQueue/${userId}/${message.id}`);
  await set(messageRef, {
    role: message.role,
    content: message.content,
    timestamp: message.timestamp.toISOString()
  });
}
```

### `listenToFirebaseQueue`

Use this to listen for new messages or responses:

```typescript
export function listenToFirebaseQueue(
  userId: string,
  callback: (message: ChatMessage) => void
): () => void {
  const db = getDatabase();
  const queueRef = ref(db, `chatQueue/${userId}`);
  
  const unsubscribe = onValue(queueRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Transform Firebase data to ChatMessage format
      callback(transformData(data));
    }
  });
  
  return unsubscribe; // Call this to cleanup
}
```

**Suggested Firebase Structure:**

```
chatQueue/
  {userId}/
    {messageId}/
      role: "user" | "assistant"
      content: "message text"
      timestamp: "2025-12-09T10:30:00Z"
      status: "pending" | "processed"
```

## Architecture

### File Structure

```
src/
├── components/
│   └── AiChat/
│       ├── AiChatButton.tsx     # Floating button component
│       ├── AiChatPanel.tsx      # Chat panel with messages & input
│       └── AiChat.css           # All styling for AI chat
├── services/
│   └── geminiService.ts         # Gemini API integration & Firebase placeholders
└── pages/
    ├── Dashboard/
    │   └── DashboardPage.tsx    # Includes AiChatButton
    └── ManualControl/
        └── ManualControlPage.tsx # Includes AiChatButton
```

### Data Flow

1. User clicks floating button → `AiChatButton` toggles `AiChatPanel`
2. User sends message → `AiChatPanel` calls `sendMessageToGemini()`
3. `geminiService` sends request to Gemini API
4. Response is post-processed and returned
5. Message history is updated in React state (memory only)
6. On page refresh, all history is lost (no persistence)

## API Reference

### `sendMessageToGemini(userMessage, conversationHistory?)`

Send a message to Gemini and get a response.

**Parameters:**
- `userMessage` (string): The user's question or prompt
- `conversationHistory` (ChatMessage[]): Optional conversation context

**Returns:** `Promise<GeminiResponse>`
```typescript
{
  text: string;      // AI response text
  success: boolean;  // Whether the request succeeded
  error?: string;    // Error message if failed
}
```

### `createChatMessage(role, content)`

Create a properly formatted ChatMessage object.

**Parameters:**
- `role` ('user' | 'assistant')
- `content` (string)

**Returns:** `ChatMessage`

## Troubleshooting

### Mock Responses Are Showing

**Problem:** Responses contain "[MOCK RESPONSE]" text

**Solution:** 
- Verify your API key is correctly set in `geminiService.ts`
- Check the browser console for errors
- Ensure the API key has proper permissions in Google AI Studio

### API Errors (401, 403)

**Problem:** Authentication or permission errors

**Solutions:**
- Double-check your API key is correct
- Verify the key is active in Google AI Studio
- Check if you've exceeded API quota limits
- Ensure your Google Cloud project has the Gemini API enabled

### Chat Panel Not Appearing

**Problem:** Clicking the button doesn't open the panel

**Solutions:**
- Check browser console for React errors
- Verify all files are imported correctly
- Clear browser cache and refresh
- Check z-index conflicts with other elements

### Styling Issues

**Problem:** Chat panel looks broken or misaligned

**Solutions:**
- Ensure `AiChat.css` is imported in `AiChatButton.tsx`
- Check for CSS conflicts with existing styles
- Verify Poppins font is loaded
- Test in different browsers

## Security Notes

⚠️ **Important:** Never commit your API key to version control!

1. Always use environment variables for API keys in production
2. Add `.env` to `.gitignore`
3. Consider implementing server-side API proxy for production
4. Monitor your API usage in Google AI Studio

## Future Enhancements

Potential improvements you can add:

- [ ] Persistent chat history with Firebase
- [ ] User authentication for personalized responses
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Context-aware responses based on current dashboard data
- [ ] File/image upload for plant diagnosis
- [ ] Export chat history as PDF
- [ ] Chat analytics and insights

## License

This feature is part of the G.R.O.B.O.X project. Refer to the main project README for license information.
