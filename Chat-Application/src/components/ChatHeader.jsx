
export default function ChatHeader({
  activeChannelName,
  messageCount,
  userCount,
  onToggleSidebar
}) {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        {onToggleSidebar && (
          <button
            type="button"
            className="mobile-sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <div className="chat-header-text">
          <div className="chat-title-group">
            <h1 className="chat-channel-title">
              {activeChannelName || 'Introductions'}
            </h1>
            <span className="chat-app-tag">Chat Application</span>
          </div>
          <p className="chat-channel-subtitle">
            This Channel Is For Company Wide Chatter • {messageCount} {messageCount === 1 ? 'message' : 'messages'}
          </p>
        </div>
      </div>

      <div className="chat-header-right">
        <div
          className="chat-members-count"
          title={`${userCount || 5} active team members out of 100 maximum`}
        >
          <span className="members-numbers">{userCount || 5} | 100</span>
          <svg className="members-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
      </div>
    </header>
  );
}
