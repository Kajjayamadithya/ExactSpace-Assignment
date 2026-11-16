import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ messages, channelName = 'Introductions', onLike }) {
  const threadBottomRef = useRef(null);

  useEffect(() => {
    if (threadBottomRef.current) {
      threadBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  return (
    <div className="chat-thread-container">
      {messages.length === 0 ? (
        <div className="empty-thread-state">
          <div className="empty-channel-icon" aria-hidden="true">#</div>
          <h3 className="empty-heading">Welcome to #{channelName}!</h3>
          <p className="empty-subtext">
            This is the start of the #{channelName} channel. Send a message to start interacting with the team.
          </p>
        </div>
      ) : (
        <div className="thread-messages-list">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onLike={onLike}
            />
          ))}
          <div ref={threadBottomRef} style={{ height: '1px' }} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
