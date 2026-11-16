/**
 * Photo Service for Picsum Photos API
 * Handles fetching paginated photos and optimizing image dimensions
 */

const PICSUM_BASE_URL = 'https://picsum.photos';
const PROXY_BASE_URL = '/api/picsum';

/**
 * Calculates a proportional, optimized image URL from the Picsum download_url
 * to prevent loading oversized 5000px+ images while maintaining the exact aspect ratio.
 *
 * @param {string} downloadUrl - e.g. "https://picsum.photos/id/0/5000/3333"
 * @param {number} targetWidth - desired gallery display width (default 800px)
 * @returns {string} - optimized image URL
 */
export const getOptimizedImageUrl = (downloadUrl, targetWidth = 800) => {
  if (!downloadUrl) return '';

  // Picsum download_url format: https://picsum.photos/id/{id}/{width}/{height}
  const match = downloadUrl.match(/^https:\/\/picsum\.photos\/id\/(\d+)\/(\d+)\/(\d+)$/);
  if (match) {
    const [, id, originalWidth, originalHeight] = match;
    const origW = parseInt(originalWidth, 10);
    const origH = parseInt(originalHeight, 10);
    // Keep proportional aspect ratio
    const targetHeight = origW > 0 ? Math.round((origH / origW) * targetWidth) : 533;
    return `${PICSUM_BASE_URL}/id/${id}/${targetWidth}/${targetHeight}`;
  }

  return downloadUrl;
};

/**
 * Fetches photos for a specific page from Picsum API
 * Automatically attempts direct request, and falls back to proxy if CORS/network fails.
 *
 * @param {number} page - page number (starts at 1)
 * @param {number} limit - items per page (default 10)
 * @returns {Promise<Array>} array of photo objects
 */
export const fetchPhotos = async (page = 1, limit = 10) => {
  const query = `page=${page}&limit=${limit}`;
  const directUrl = `${PICSUM_BASE_URL}/v2/list?${query}`;
  const proxyUrl = `${PROXY_BASE_URL}/v2/list?${query}`;

  try {
    // Attempt direct fetch first
    const response = await fetch(directUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (directError) {
    // If direct fetch fails (e.g. CORS block in specific environment), attempt proxy fallback
    console.warn(`Direct fetch failed for page ${page}, attempting proxy fallback...`, directError);
    try {
      const proxyResponse = await fetch(proxyUrl);
      if (!proxyResponse.ok) {
        throw new Error(`Proxy HTTP error! status: ${proxyResponse.status}`);
      }
      const proxyData = await proxyResponse.json();
      return Array.isArray(proxyData) ? proxyData : [];
    } catch (proxyError) {
      console.error(`Failed to fetch photos for page ${page}:`, proxyError);
      throw new Error(
        `Unable to load photos (Page ${page}). Please check your internet connection and try again.`
      );
    }
  }
};
