import React, { useState } from 'react';
import AiChatPanel from './AiChatPanel';
import images from '../../assets/images';
import './AiChat.css';

/**
 * Floating AI Chat Button Component
 * 
 * Displays a floating button in the bottom-right corner that toggles the AI chat panel.
 */
const AiChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`ai-chat-button ${isChatOpen ? 'chat-open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle AI Chat"
        title="AI Assistant"
      >
        <img 
          src={images.geminiIcon} 
          alt="Gemini AI" 
          className="ai-chat-button-icon"
        />
        {!isChatOpen && (
          <span className="ai-chat-button-pulse"></span>
        )}
      </button>

      {/* Chat Panel */}
      {isChatOpen && (
        <AiChatPanel onClose={() => setIsChatOpen(false)} />
      )}
    </>
  );
};

export default AiChatButton;
