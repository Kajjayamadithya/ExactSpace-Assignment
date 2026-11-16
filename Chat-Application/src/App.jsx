import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { INITIAL_USER_LIST, CHANNELS } from './constants';

export default function App() {
  // Persistent channels with fallback to initial defaults
  const [channels, setChannels] = useState(() => {
    try {
      const saved = localStorage.getItem('chat_channels');
      return saved ? JSON.parse(saved) : CHANNELS;
    } catch {
      return CHANNELS;
    }
  });

  // Persistent active channel
  const [activeChannelId, setActiveChannelId] = useState(() => {
    try {
      return localStorage.getItem('chat_active_channel') || 'introductions';
    } catch {
      return 'introductions';
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persistent messages
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('chat_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent dynamic users pool
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('chat_users');
      return saved ? JSON.parse(saved) : INITIAL_USER_LIST;
    } catch {
      return INITIAL_USER_LIST;
    }
  });

  // Save channels to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('chat_channels', JSON.stringify(channels));
    } catch (err) {
      console.error('Error saving channels:', err);
    }
  }, [channels]);

  // Save active channel selection to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chat_active_channel', activeChannelId);
    } catch (err) {
      console.error('Error saving active channel:', err);
    }
  }, [activeChannelId]);

  // Save messages to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    } catch (err) {
      console.error('Error saving messages:', err);
    }
  }, [messages]);

  // Save users to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('chat_users', JSON.stringify(users));
    } catch (err) {
      console.error('Error saving users:', err);
    }
  }, [users]);

  // Ensure current active channel exists in list
  const activeChannel =
    channels.find((c) => c.id === activeChannelId) ||
    channels[0] ||
    { id: 'general', name: 'General' };

  // Dynamically add a new channel / conversation
  const handleAddChannel = (rawChannelName) => {
    const trimmed = rawChannelName ? rawChannelName.trim() : '';
    if (!trimmed) {
      return { success: false, error: 'Channel name cannot be empty.' };
    }
    const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const exists = channels.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase() || c.id === slug
    );
    if (exists) {
      return { success: false, error: `Channel "${trimmed}" already exists.` };
    }

    const newChannel = {
      id: slug || `channel-${Date.now()}`,
      name: trimmed
    };

    setChannels((prev) => [...prev, newChannel]);
    setActiveChannelId(newChannel.id); // Automatically switch to the newly created channel
    return { success: true };
  };

  // Dynamically add a new user
  const handleAddUser = (rawName) => {
    const trimmed = rawName ? rawName.trim() : '';
    if (!trimmed) {
      return { success: false, error: 'Please enter a valid user name.' };
    }
    if (users.some((u) => u.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, error: `User "${trimmed}" already exists.` };
    }

    setUsers((prev) => [...prev, trimmed]);
    return { success: true };
  };

  // Dynamically remove a user
  const handleRemoveUser = (usernameToRemove) => {
    if (users.length <= 1) return;
    setUsers((prev) => prev.filter((u) => u !== usernameToRemove));
  };

  // Helper for random username selection from dynamic users pool
  const getRandomUsername = () => {
    if (users.length === 0) return 'Guest';
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };

  // Unique ID generator
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  // Timestamp format (e.g. 17:28 matching image)
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Send message handler linked to active channel
  const handleSendMessage = (text) => {
    const newMessage = {
      id: generateUniqueId(),
      username: getRandomUsername(),
      text: text,
      likes: 0,
      timestamp: formatTime(),
      channelId: activeChannel.id
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Like message handler (immutable)
  const handleLikeMessage = (messageId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  // Filter messages for current active channel
  const activeChannelMessages = messages.filter(
    (msg) => !msg.channelId || msg.channelId === activeChannel.id
  );

  return (
    <div className="app-layout">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar with Dynamic Channels and User Management */}
      <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          channels={channels}
          activeChannel={activeChannel.id}
          onSelectChannel={(id) => {
            setActiveChannelId(id);
            setSidebarOpen(false);
          }}
          onAddChannel={handleAddChannel}
          users={users}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
        />
      </div>

      {/* Main Chat Panel */}
      <main className="chat-main-area">
        <ChatHeader
          activeChannelName={activeChannel.name}
          messageCount={activeChannelMessages.length}
          userCount={users.length}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <MessageList
          messages={activeChannelMessages}
          channelName={activeChannel.name}
          onLike={handleLikeMessage}
        />
        <MessageInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}
