import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing infinite scrolling with IntersectionObserver.
 * Observes a bottom sentinel DOM element and triggers the callback when visible.
 *
 * @param {Function} onIntersect - Callback to invoke when sentinel enters viewport
 * @param {Object} options
 * @param {boolean} options.hasMore - Whether more items are available to load
 * @param {boolean} options.isLoading - Whether a request is currently active
 * @param {string} [options.rootMargin='200px'] - Pre-fetch margin before bottom
 * @param {number} [options.threshold=0.1] - Intersection threshold
 * @returns {React.RefObject} Ref to attach to the sentinel element
 */
export const useInfiniteScroll = (onIntersect, {
  hasMore = true,
  isLoading = false,
  rootMargin = '200px',
  threshold = 0.1,
} = {}) => {
  const sentinelRef = useRef(null);
  const onIntersectRef = useRef(onIntersect);

  // Keep latest callback reference
  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      // Trigger only if sentinel is intersecting, more data is available, and not already loading
      if (entry.isIntersecting && hasMore && !isLoading) {
        if (onIntersectRef.current) {
          onIntersectRef.current();
        }
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Viewport
      rootMargin,
      threshold,
    });

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [handleObserver, hasMore, rootMargin, threshold]);

  return sentinelRef;
};
