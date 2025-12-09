# 🌬️ Windy AI Assistant - Technical Documentation

## Overview

**Windy** is an AI assistant specialized for smart growth chamber monitoring and analysis. Powered by Google's Gemini API, Windy provides data-driven insights and recommendations by analyzing real-time sensor data and historical trends from Firebase.

## Core Capabilities

### 1. Real-Time Data Analysis
Windy automatically fetches and analyzes data from multiple sources before every response:

**Firebase Realtime Database (Current Status):**
- `status/group12` - Environmental sensors
- `status/group3` - Light control and monitoring
- `status/group30` - Fan/ventilation control
- `status/group6&35` - Additional sensors and controls

**Firestore (Historical Trends):**
- `growthChamber/group30/sensorData` - Fan RPM history (last 15 records)
- `growthChamber/group3/sensorData` - Light intensity history (last 15 records)

### 2. Context-Aware Responses
Every user message triggers:
1. **Data Fetch**: All Firebase paths are queried in parallel
2. **Context Building**: Data is serialized into structured format
3. **Prompt Construction**: System prompt + Firebase data + user message
4. **AI Analysis**: Gemini processes the complete context
5. **Response**: Data-driven, specific recommendations

### 3. Intelligent Behavior
- ✅ References actual sensor values and timestamps
- ✅ Identifies trends and patterns in historical data
- ✅ Provides specific, actionable recommendations
- ✅ States clearly when data is missing or unavailable
- ✅ Explains which data sources are available
- ✅ Compares readings against optimal plant growth ranges

## Architecture

### Data Flow

```
User Question
    ↓
sendMessageToGemini()
    ↓
├─ fetchRtdbStatus('group12')
├─ fetchRtdbStatus('group3')
├─ fetchRtdbStatus('group30')
├─ fetchRtdbStatus('group6&35')
├─ fetchFirestoreHistory('group30/sensorData')
└─ fetchFirestoreHistory('group3/sensorData')
    ↓
serializeContextData()
    ↓
buildWindyPrompt()
    ↓
Gemini API Request
    ↓
extractTextFromGeminiResponse()
    ↓
postProcessWindyResponse()
    ↓
Windy's Response
```

### Key Functions

#### `sendMessageToGemini(userMessage, conversationHistory?)`
Main entry point for AI responses.

**Process:**
1. Validates API key configuration
2. Fetches all Firebase data via `fetchAllFirebaseData()`
3. Builds complete prompt with `buildWindyPrompt()`
4. Sends request to Gemini API
5. Processes and returns response

**Parameters:**
- `userMessage` (string): User's question
- `conversationHistory` (ChatMessage[]): Optional conversation context

**Returns:** `GeminiResponse` with AI-generated text

#### `fetchAllFirebaseData()`
Fetches all required data from Firebase sources.

**Returns:** `ContextData` object containing:
```typescript
{
  rtdb: {
    group12?: {...},
    group3?: {...},
    group30?: {...},
    'group6&35'?: {...}
  },
  firestore: {
    group30History?: [...],
    group3History?: [...]
  },
  fetchedAt: "ISO timestamp"
}
```

#### `getWindySystemPrompt()`
Returns Windy's personality, capabilities, and behavioral rules.

**Key Instructions to Gemini:**
- Introduce as "Windy, AI assistant specialized in growth chambers"
- Always reference provided Firebase data
- Never hallucinate values
- Provide practical, data-driven recommendations
- Explain data sources when asked vague questions
- Focus on airflow, light, humidity, soil moisture, water usage

#### `serializeContextData(contextData)`
Converts structured ContextData into readable text format for Gemini.

**Output Format:**
```
=== CURRENT GROWTH CHAMBER DATA ===
Data fetched at: 2025-12-09T...

--- REAL-TIME DATABASE (Current Status) ---

[Group 12 - Environmental Sensors]
{...JSON data...}

[Group 3 - Light Control]
{...JSON data...}

--- FIRESTORE (Historical Trends) ---

[Group 30 History - 15 recent records]
[{...}, {...}, ...]

=== END OF DATA ===
```

#### `buildWindyPrompt(userMessage, contextData, conversationHistory?)`
Constructs the complete prompt sent to Gemini.

**Structure:**
1. System prompt (Windy's personality & rules)
2. Serialized Firebase data
3. Conversation history (last 5 messages)
4. Current user question
5. Instruction to analyze and respond

## Configuration

### Adjustable Parameters

**`FIRESTORE_HISTORY_LIMIT`** (Line 32)
```typescript
const FIRESTORE_HISTORY_LIMIT = 15; // Number of historical documents to fetch
```
- Default: 15 records
- Increase for more historical context
- Decrease to reduce data size and API costs

**System Prompt** (Function: `getWindySystemPrompt()`)
Customize Windy's personality, tone, and behavioral rules here.

**Post-Processing** (Function: `postProcessWindyResponse()`)
Add custom formatting, unit conversions, or response enhancements.

## Usage Examples

### Basic Question
```typescript
const response = await sendMessageToGemini("What's the current temperature?");
// Windy fetches group12 data and responds with actual value
```

### Trend Analysis
```typescript
const response = await sendMessageToGemini("How has fan RPM changed over time?");
// Windy analyzes group30History from Firestore and identifies patterns
```

### Recommendation Request
```typescript
const response = await sendMessageToGemini("Should I increase airflow?");
// Windy considers current temp, humidity, fan RPM, and provides data-driven advice
```

### With Conversation History
```typescript
const history = [
  createChatMessage('user', 'What is the humidity?'),
  createChatMessage('assistant', 'Current humidity is 65%'),
];
const response = await sendMessageToGemini("Is that optimal?", history);
// Windy understands "that" refers to humidity from context
```

## Error Handling

### API Key Not Configured
If Gemini API key is missing, Windy falls back to `getWindyMockResponse()`:
- Provides informative mock responses
- Explains available data sources
- Instructs how to configure API key

### Firebase Data Unavailable
If specific Firebase paths return no data:
- `null` is returned for that group
- Serialized context shows "No data available"
- Windy explicitly states which data is missing in response

### API Request Failures
Network or API errors are caught and return:
```typescript
{
  text: "Sorry, I encountered an error...",
  success: false,
  error: "Error message"
}
```

## Performance Optimization

### Parallel Data Fetching
All Firebase queries use `Promise.all()` for maximum efficiency:
```typescript
const [group12, group3, group30, ...] = await Promise.all([...]);
```

### Firestore Query Optimization
- `orderBy('timestamp', 'desc')` - Most recent first
- `limit(FIRESTORE_HISTORY_LIMIT)` - Controlled data size
- Results reversed to chronological order for better context

### Token Management
- `maxOutputTokens: 2048` - Allows detailed responses
- Conversation history limited to last 5 messages
- Historical data limited to 15 records per collection

## Security

### Firebase Configuration
- Reuses existing Firebase app if available
- Uses centralized config from `apiConfig.ts`
- No duplicate initialization

### API Key Protection
- Imported from secure config file
- Validated before each request
- Graceful fallback if missing

### Data Privacy
- All data fetched client-side
- No data sent to external servers except Gemini API
- Chat history not persisted (memory-only)

## Testing

### Mock Mode
When API key not configured, Windy provides mock responses:
- Explains capabilities
- Lists available data sources
- Provides example insights
- Instructs how to enable full AI mode

### Debug Logging
Console logs track:
- `[Windy] Fetching Firebase data...`
- `[Windy] Sending prompt to Gemini API...`
- `[Windy] Prompt length: X characters`
- `[Windy] Response received successfully`
- Errors and warnings

## Customization Guide

### 1. Adjust Historical Data Range
```typescript
// Line 32
const FIRESTORE_HISTORY_LIMIT = 20; // Increase for more context
```

### 2. Modify System Prompt
Edit `getWindySystemPrompt()` to change:
- Personality and tone
- Specialized knowledge areas
- Response format preferences
- Behavioral rules

### 3. Add New Data Sources
```typescript
// In fetchAllFirebaseData()
const newGroupData = await fetchRtdbStatus('newGroup');

// Add to ContextData type
interface ContextData {
  rtdb: {
    newGroup?: RtdbGroupData;
    // ...
  }
}
```

### 4. Customize Response Formatting
```typescript
// In postProcessWindyResponse()
function postProcessWindyResponse(text: string): string {
  let processed = text.trim();
  
  // Add custom formatting
  processed = processed.replace(/(\d+)°C/g, '$1°C 🌡️');
  processed = processed.replace(/(\d+)%/g, '$1% 💧');
  
  return processed;
}
```

## Quick Questions

Update `AiChatPanel.tsx` to customize quick question buttons:
```typescript
const QUICK_QUESTIONS = [
  "Analyze current sensor readings",
  "Are my environmental conditions optimal?",
  "What trends do you see in the data?",
  "Any recommendations for improvement?",
];
```

## Integration with Dashboard

Windy is available on:
- ✅ Dashboard Page (monitoring view)
- ✅ Manual Control Page (control interface)

Accessible via floating button in bottom-right corner.

## Troubleshooting

### "API key not configured" Warning
**Solution:** Add Gemini API key to `src/config/apiConfig.ts`

### Firebase Data Not Loading
**Check:**
1. Firebase config in `apiConfig.ts` is correct
2. RTDB paths match your database structure
3. Firestore collections exist and have data
4. Browser console for error messages

### Gemini API Errors (401, 403)
**Solutions:**
- Verify API key is valid
- Check quota limits in Google AI Studio
- Ensure API is enabled in Google Cloud Console

### Slow Response Times
**Optimizations:**
- Reduce `FIRESTORE_HISTORY_LIMIT`
- Check Firebase query performance
- Monitor network latency

## Best Practices

1. **Keep System Prompt Focused**: Clear instructions produce better responses
2. **Limit Historical Data**: Balance context richness with performance
3. **Monitor API Usage**: Track costs in Google AI Studio
4. **Test Edge Cases**: Verify behavior when data is missing
5. **Update Quick Questions**: Keep them relevant to your use case

## Future Enhancements

Potential improvements:
- [ ] Cache Firebase data for X seconds to reduce queries
- [ ] Smart data fetching (only fetch groups relevant to question)
- [ ] Support for custom alert thresholds
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Export analysis reports
- [ ] Scheduled health checks
- [ ] Predictive maintenance alerts

---

**Windy Version:** 1.0.0  
**Last Updated:** December 9, 2025  
**Powered by:** Google Gemini Pro
