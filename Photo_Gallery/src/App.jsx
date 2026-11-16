import React, { useState, useEffect, useRef, useCallback } from 'react';
import GalleryHeader from './components/GalleryHeader';
import PhotoList from './components/PhotoList';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { fetchPhotos } from './services/photoService';

const PAGE_SIZE = 10;

function App() {
  // State management
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [likes, setLikes] = useState({});

  // Ref to strictly prevent multiple simultaneous requests or race conditions during rapid scrolling
  const isRequestInProgressRef = useRef(false);

  /**
   * Fetches photos for a specified page number
   * Appends new photos to state and updates pagination status
   */
  const loadPhotos = useCallback(async (pageToLoad) => {
    // Prevent duplicate calls if already fetching or if no more photos available
    if (isRequestInProgressRef.current) {
      return;
    }

    isRequestInProgressRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const newPhotos = await fetchPhotos(pageToLoad, PAGE_SIZE);

      if (!newPhotos || newPhotos.length === 0) {
        // API returned an empty list -> stop further pagination
        setHasMore(false);
      } else {
        // Append newly fetched photos while ensuring unique photo IDs
        setPhotos((prevPhotos) => {
          const existingIds = new Set(prevPhotos.map((p) => p.id));
          const uniqueNewPhotos = newPhotos.filter((p) => !existingIds.has(p.id));
          return [...prevPhotos, ...uniqueNewPhotos];
        });

        // Advance to next page number for subsequent fetch
        setPage(pageToLoad + 1);

        // If returned item count is less than page size, we reached the end
        if (newPhotos.length < PAGE_SIZE) {
          setHasMore(false);
        }
      }
    } catch (err) {
      // Retain existing photos and record error
      setError(err.message || 'An error occurred while fetching photos.');
    } finally {
      setIsLoading(false);
      isRequestInProgressRef.current = false;
    }
  }, []);

  // Initial fetch on component mount (Page 1)
  useEffect(() => {
    loadPhotos(1);
  }, [loadPhotos]);

  // Handler for infinite scroll intersection
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && !error) {
      loadPhotos(page);
    }
  }, [isLoading, hasMore, error, loadPhotos, page]);

  // Infinite scroll hook observing bottom sentinel element
  const sentinelRef = useInfiniteScroll(handleLoadMore, {
    hasMore,
    isLoading,
    rootMargin: '250px', // Fetch slightly before reaching the very edge
  });

  // Handler for retry button
  const handleRetry = useCallback(() => {
    if (!isLoading) {
      loadPhotos(page);
    }
  }, [isLoading, loadPhotos, page]);

  // Individual like button handler with immutable state update
  const handleLike = useCallback((photoId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [photoId]: (prevLikes[photoId] || 0) + 1,
    }));
  }, []);

  return (
    <div className="app-layout">
      <GalleryHeader totalLoaded={photos.length} />

      <main className="gallery-main">
        <PhotoList
          photos={photos}
          likes={likes}
          onLike={handleLike}
          sentinelRef={sentinelRef}
          isLoading={isLoading}
          error={error}
          hasMore={hasMore}
          onRetry={handleRetry}
        />
      </main>

      <footer className="gallery-footer">
        <p>© {new Date().getFullYear()} Photo Gallery • Built with React.js & Picsum Photos API</p>
      </footer>
    </div>
  );
}

export default App;
