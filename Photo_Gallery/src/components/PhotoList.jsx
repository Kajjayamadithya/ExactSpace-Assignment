import React from 'react';
import PhotoCard from './PhotoCard';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

/**
 * PhotoList Component
 * Renders photos in a vertical single-column layout, along with the sentinel element,
 * loading spinner, error message with retry button, and end-of-list message.
 *
 * @param {Object} props
 * @param {Array} props.photos - List of photos
 * @param {Object} props.likes - Map of photo IDs to like counts
 * @param {Function} props.onLike - Callback for liking a photo
 * @param {React.RefObject} props.sentinelRef - Ref attached to bottom sentinel for infinite scroll
 * @param {boolean} props.isLoading - Whether a page is currently loading
 * @param {string|null} props.error - Current error message, if any
 * @param {boolean} props.hasMore - Whether more pages are available
 * @param {Function} props.onRetry - Retry callback
 */
const PhotoList = ({
  photos,
  likes,
  onLike,
  sentinelRef,
  isLoading,
  error,
  hasMore,
  onRetry,
}) => {
  return (
    <div className="gallery-container">
      {/* Vertically arranged single-column image gallery */}
      <div className="photo-column">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            likes={likes[photo.id] || 0}
            onLike={onLike}
          />
        ))}
      </div>

      {/* Sentinel element observed by IntersectionObserver to trigger next page load */}
      {hasMore && !error && (
        <div
          ref={sentinelRef}
          className="scroll-sentinel"
          aria-hidden="true"
        />
      )}

      {/* Bottom loading indicator during pagination */}
      {isLoading && (
        <LoadingIndicator
          isInitial={photos.length === 0}
          message={photos.length === 0 ? 'Fetching gallery...' : 'Loading more photos...'}
        />
      )}

      {/* Bottom error state with retry button without losing existing photos */}
      {error && !isLoading && (
        <ErrorMessage
          message={error}
          onRetry={onRetry}
          isInitial={photos.length === 0}
        />
      )}

      {/* Reached end of collection */}
      {!hasMore && !isLoading && photos.length > 0 && (
        <EmptyState isEnd message="You have viewed all photos in this collection." />
      )}
    </div>
  );
};

export default PhotoList;
