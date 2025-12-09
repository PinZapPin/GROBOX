import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  sendMessageToGemini, 
  createChatMessage 
} from '../../services/geminiService';
import images from '../../assets/images';
import './AiChat.css';

interface AiChatPanelProps {
  onClose: () => void;
}

/**
 * Quick question presets for easy access
 * These are tailored for Windy's growth chamber analysis capabilities
 */
const QUICK_QUESTIONS = [
  "Analyze current sensor readings",
  "Are my environmental conditions optimal?",
  "What trends do you see in the data?",
  "Any recommendations for improvement?",
];

/**
 * AI Chat Panel Component
 * 
 * Floating chat panel with message history, input, and quick questions.
 * All chat history is stored in memory only (React state) and resets on page refresh.
 */
const AiChatPanel: React.FC<AiChatPanelProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    
    if (!textToSend || isLoading) return;

    // Clear input
    setInputValue('');

    // Add user message
    const userMessage = createChatMessage('user', textToSend);
    setMessages(prev => [...prev, userMessage]);

    // Set loading state
    setIsLoading(true);

    try {
      // Send to Gemini and get response
      const response = await sendMessageToGemini(textToSend, messages);

      // Add assistant response
      const assistantMessage = createChatMessage('assistant', response.text);
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('[AiChatPanel] Error sending message:', error);
      
      // Add error message
      const errorMessage = createChatMessage(
        'assistant',
        'Sorry, I encountered an error. Please try again.'
      );
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="ai-chat-panel">
      {/* Header */}
      <div className="ai-chat-header">
        <div className="ai-chat-header-left">
          <img 
            src={images.geminiIcon} 
            alt="Gemini" 
            className="ai-chat-header-icon"
          />
          <div>
            <h3 className="ai-chat-title">Windy AI Assistant</h3>
            <p className="ai-chat-subtitle">Growth Chamber Specialist</p>
          </div>
        </div>
        <button 
          className="ai-chat-close-btn"
          onClick={onClose}
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages Area */}
      <div className="ai-chat-messages">
        {messages.length === 0 ? (
          <div className="ai-chat-empty">
            <img 
              src={images.geminiIcon} 
              alt="Gemini" 
              className="ai-chat-empty-icon"
            />
            <p className="ai-chat-empty-text">
              Hi! I'm Windy, your growth chamber AI specialist. 🌬️
            </p>
            <p className="ai-chat-empty-subtext">
              I analyze sensor data, monitor trends, and provide recommendations for optimal plant health. Ask me anything!
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`ai-chat-message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="ai-chat-message-content">
                  <p className="ai-chat-message-text">{msg.content}</p>
                  <span className="ai-chat-message-time">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-chat-message assistant-message">
                <div className="ai-chat-message-content">
                  <div className="ai-chat-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Quick Questions */}
      {messages.length === 0 && (
        <div className="ai-chat-quick-questions">
          <p className="ai-chat-quick-title">Quick Questions:</p>
          <div className="ai-chat-quick-chips">
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                className="ai-chat-quick-chip"
                onClick={() => handleQuickQuestion(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="ai-chat-input-container">
        <input
          ref={inputRef}
          type="text"
          className="ai-chat-input"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="ai-chat-send-btn"
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send message"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AiChatPanel;
