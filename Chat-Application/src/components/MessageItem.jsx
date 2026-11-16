import { getUserMeta } from '../constants';

export default function MessageItem({ message, onLike }) {
  const { id, username, text, likes, timestamp } = message;
  const userMeta = getUserMeta(username);

  return (
    <article className="message-row" aria-label={`Message from ${username}`}>
      {/* Circular Avatar with Dynamic Initials and Color */}
      <div
        className="message-avatar"
        style={{
          backgroundColor: userMeta.avatarBg,
          color: userMeta.avatarColor
        }}
        aria-hidden="true"
        title={username}
      >
        {userMeta.initials}
      </div>

      {/* Message Content Area */}
      <div className="message-content-col">
        {/* Username & Timestamp Header */}
        <div className="message-meta-header">
          <span className="message-sender-name">{username}</span>
          {timestamp && <span className="message-time-label">{timestamp}</span>}
        </div>

        {/* Message Bubble Card */}
        <div className="message-bubble-wrapper">
          <div className="message-bubble">
            <p className="message-text">{text}</p>
            
            {/* Interactive Like Button */}
            <button
              type="button"
              className={`message-like-btn ${likes > 0 ? 'is-liked' : ''}`}
              onClick={() => onLike(id)}
              aria-label={`Like message from ${username}. Current likes: ${likes}`}
              title="Like this message"
            >
              <svg
                className="heart-icon"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill={likes > 0 ? '#ef4444' : 'none'}
                stroke={likes > 0 ? '#ef4444' : '#94a3b8'}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="likes-badge">{likes}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
