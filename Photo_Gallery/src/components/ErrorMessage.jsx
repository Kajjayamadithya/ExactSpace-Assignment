import React from 'react';

/**
 * ErrorMessage Component
 * Displays user-friendly error details with a retry action
 *
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Callback to trigger retry
 * @param {boolean} [props.isRetrying=false] - Whether retry request is currently pending
 * @param {boolean} [props.isInitial=false] - Whether the error occurred on initial load
 */
const ErrorMessage = ({
  message,
  onRetry,
  isRetrying = false,
  isInitial = false,
}) => {
  return (
    <div className={`error-container ${isInitial ? 'initial-error' : 'pagination-error'}`} role="alert">
      <div className="error-icon" aria-hidden="true">
        ⚠️
      </div>
      <div className="error-content">
        <h3 className="error-title">
          {isInitial ? 'Failed to Load Gallery' : 'Failed to Load More Photos'}
        </h3>
        <p className="error-description">{message}</p>
        <button
          type="button"
          className="retry-button"
          onClick={onRetry}
          disabled={isRetrying}
        >
          {isRetrying ? 'Retrying...' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
