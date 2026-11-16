import React from 'react';

/**
 * EmptyState Component
 * Displays messages when gallery is empty or when the user reached the end of the collection
 *
 * @param {Object} props
 * @param {boolean} [props.isEnd=false] - Whether this represents the end of pagination
 * @param {string} [props.message] - Custom message
 */
const EmptyState = ({ isEnd = false, message }) => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon">
        {isEnd ? '🎉' : '📷'}
      </div>
      <p className="empty-state-title">
        {isEnd ? "You've reached the end!" : 'No Photos Found'}
      </p>
      <p className="empty-state-subtitle">
        {message || (isEnd ? 'All available photos have been loaded.' : 'Check back later for new photos.')}
      </p>
    </div>
  );
};

export default EmptyState;
