import { useState } from 'react';
import { getUserMeta } from '../constants';

export default function Sidebar({
  channels = [],
  activeChannel,
  onSelectChannel,
  onAddChannel,
  users = [],
  onAddUser,
  onRemoveUser
}) {
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [channelError, setChannelError] = useState('');

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [userError, setUserError] = useState('');

  const handleAddChannelSubmit = (e) => {
    e.preventDefault();
    if (!onAddChannel) return;
    const result = onAddChannel(newChannelName);
    if (result.success) {
      setNewChannelName('');
      setChannelError('');
      setIsAddingChannel(false);
    } else {
      setChannelError(result.error);
    }
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!onAddUser) return;
    const result = onAddUser(newUserName);
    if (result.success) {
      setNewUserName('');
      setUserError('');
      setIsAddingUser(false);
    } else {
      setUserError(result.error);
    }
  };

  return (
    <aside className="chat-sidebar">
      {/* Current User Profile */}
      <div className="sidebar-profile">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">RR</div>
          <span className="profile-status-dot" title="Online"></span>
        </div>
        <div className="profile-details">
          <h2 className="profile-name">Excat Space</h2>
          <span className="profile-role">UI Developer</span>
        </div>
      </div>

      {/* Conversations Section */}
      <div className="sidebar-conversations-section">
        <div className="conversations-header">
          <span className="conversations-title">Conversations</span>
          <button
            type="button"
            className={`add-channel-btn ${isAddingChannel ? 'active' : ''}`}
            onClick={() => {
              setIsAddingChannel((prev) => !prev);
              setChannelError('');
            }}
            aria-label="Add conversation"
            title="Create new conversation channel"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Add Channel Form */}
        {isAddingChannel && (
          <form className="add-channel-form" onSubmit={handleAddChannelSubmit}>
            <input
              type="text"
              className="add-channel-input"
              placeholder="e.g. Design, General"
              value={newChannelName}
              onChange={(e) => {
                setNewChannelName(e.target.value);
                if (channelError) setChannelError('');
              }}
              autoFocus
            />
            {channelError && (
              <span className="add-channel-error">{channelError}</span>
            )}
            <div className="add-channel-actions">
              <button type="submit" className="add-channel-save-btn">
                Add Channel
              </button>
              <button
                type="button"
                className="add-channel-cancel-btn"
                onClick={() => {
                  setIsAddingChannel(false);
                  setNewChannelName('');
                  setChannelError('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <nav className="channels-list" aria-label="Channels">
          {channels.map((channel) => {
            const isActive = channel.id === activeChannel;
            return (
              <button
                key={channel.id}
                type="button"
                className={`channel-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectChannel(channel.id)}
              >
                <span className="channel-hash-badge">#</span>
                <span className="channel-name">{channel.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Dynamic Team Members Section */}
      <div className="sidebar-members-section">
        <div className="members-header">
          <span className="members-title">
            Team Members ({users.length})
          </span>
          <button
            type="button"
            className="add-member-btn"
            onClick={() => {
              setIsAddingUser((prev) => !prev);
              setUserError('');
            }}
            title="Add a new user"
            aria-label="Add new user"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add</span>
          </button>
        </div>

        {/* Add User Input Form */}
        {isAddingUser && (
          <form className="add-user-form" onSubmit={handleAddUserSubmit}>
            <input
              type="text"
              className="add-user-input"
              placeholder="Enter name (e.g. Sarah)"
              value={newUserName}
              onChange={(e) => {
                setNewUserName(e.target.value);
                if (userError) setUserError('');
              }}
              autoFocus
            />
            {userError && (
              <span className="add-user-error">{userError}</span>
            )}
            <div className="add-user-actions">
              <button type="submit" className="add-user-save-btn">
                Add User
              </button>
              <button
                type="button"
                className="add-user-cancel-btn"
                onClick={() => {
                  setIsAddingUser(false);
                  setNewUserName('');
                  setUserError('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Scrollable Dynamic User List */}
        <div className="sidebar-users-list">
          {users.map((username) => {
            const meta = getUserMeta(username);
            return (
              <div key={username} className="user-list-item">
                <div
                  className="user-item-avatar"
                  style={{ backgroundColor: meta.avatarBg, color: meta.avatarColor }}
                >
                  {meta.initials}
                </div>
                <span className="user-item-name" title={username}>
                  {username}
                </span>
                {onRemoveUser && users.length > 1 && (
                  <button
                    type="button"
                    className="user-remove-btn"
                    onClick={() => onRemoveUser(username)}
                    title={`Remove ${username}`}
                    aria-label={`Remove ${username}`}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
