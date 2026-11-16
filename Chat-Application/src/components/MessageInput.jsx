import { useState, useRef } from 'react';

const COMMON_EMOJIS = ['👋', '👏', '⬇️', '😊', '❤️', '🔥', '🎉', '🚀'];

export default function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSendMessage(trimmed);
    setText('');
    setShowEmojis(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInsertEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const isSendDisabled = text.trim().length === 0;

  return (
    <footer className="chat-input-bar-container">
      {showEmojis && (
        <div className="emoji-popover" role="toolbar" aria-label="Emoji picker">
          {COMMON_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="emoji-choice-btn"
              onClick={() => handleInsertEmoji(emoji)}
              aria-label={`Insert ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="chat-input-capsule">
          <input
            ref={inputRef}
            type="text"
            className="chat-text-field"
            placeholder="Type Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            aria-label="Type Message"
          />

          <button
            type="button"
            className={`input-emoji-btn ${showEmojis ? 'active' : ''}`}
            onClick={() => setShowEmojis((prev) => !prev)}
            aria-label="Insert Emoji"
            title="Emoji Picker"
          >
            {/* Smile icon matching reference image */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
        </div>

        <button
          type="submit"
          className="chat-send-btn"
          disabled={isSendDisabled}
          aria-label="Send message"
          title={isSendDisabled ? "Type a message to send" : "Send message (Enter)"}
        >
          <span>Send</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </footer>
  );
}
