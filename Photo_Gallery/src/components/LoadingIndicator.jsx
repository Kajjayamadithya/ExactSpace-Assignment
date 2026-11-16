import React from 'react';

/**
 * LoadingIndicator Component
 * Displays a clean spinner and text for initial or pagination loading states
 *
 * @param {Object} props
 * @param {boolean} [props.isInitial=false] - If true, displays large full-page initial loader
 * @param {string} [props.message='Loading photos...'] - Text to display below spinner
 */
const LoadingIndicator = ({ isInitial = false, message = 'Loading photos...' }) => {
  return (
    <div className={`loading-indicator-container ${isInitial ? 'initial-loader' : 'pagination-loader'}`}>
      <div className="spinner" aria-hidden="true">
        <div className="spinner-circle" />
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
