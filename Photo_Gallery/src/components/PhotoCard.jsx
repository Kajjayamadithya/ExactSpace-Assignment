import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { getOptimizedImageUrl } from '../services/photoService';

/**
 * PhotoCard Component
 * Displays an individual photo with its author, like button with Font Awesome icon, and like counter.
 *
 * @param {Object} props
 * @param {Object} props.photo - Photo data object from Picsum API
 * @param {number} props.likes - Current like count for this photo
 * @param {Function} props.onLike - Callback invoked when like button is clicked
 */
const PhotoCard = ({ photo, likes = 0, onLike }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Optimized image URL for gallery display (keeps aspect ratio, avoids fetching 5000px raw file)
  // Falls back to direct download_url if optimization is not applicable
  const displayImageUrl = getOptimizedImageUrl(photo.download_url, 800) || photo.download_url;

  const handleLikeClick = () => {
    setIsAnimating(true);
    onLike(photo.id);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <article className="photo-card" data-photo-id={photo.id}>
      <div className="photo-image-wrapper">
        {/* Placeholder skeleton loader while image is loading */}
        {!imageLoaded && !imageError && (
          <div className="photo-skeleton">
            <div className="skeleton-shimmer" />
          </div>
        )}

        {imageError ? (
          <div className="photo-image-fallback">
            <span>Unable to load photo</span>
          </div>
        ) : (
          <img
            src={displayImageUrl}
            alt={`Photo by ${photo.author || 'Unknown'}`}
            className={`photo-image ${imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              // If optimized URL fails, fallback to raw download_url
              if (displayImageUrl !== photo.download_url) {
                // Retry once with original download_url
                setImageLoaded(false);
              } else {
                setImageError(true);
              }
            }}
          />
        )}
      </div>

      <div className="photo-details">
        <div className="photo-author-section">
          <span className="author-label">Photographer</span>
          <h2 className="photo-author">{photo.author || 'Unknown Artist'}</h2>
        </div>

        <div className="photo-actions">
          <button
            type="button"
            className={`like-button ${likes > 0 ? 'liked' : ''} ${isAnimating ? 'bump' : ''}`}
            onClick={handleLikeClick}
            aria-label={`Like photo by ${photo.author}. Currently ${likes} likes`}
            title="Like this photo"
          >
            <FontAwesomeIcon icon={faThumbsUp} className="like-icon" />
            <span className="like-count">{likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PhotoCard);
