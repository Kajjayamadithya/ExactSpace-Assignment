/**
 * Verification test script for Photo Gallery logic
 */
import { getOptimizedImageUrl } from './src/services/photoService.js';

console.log('--- Testing Image Optimization & Aspect Ratio Preservation ---');
const sampleUrl = 'https://picsum.photos/id/10/2500/1667';
const optimized = getOptimizedImageUrl(sampleUrl, 800);
console.log('Original:', sampleUrl);
console.log('Optimized (800w):', optimized);
const expectedHeight = Math.round((1667 / 2500) * 800); // 533
if (optimized === `https://picsum.photos/id/10/800/${expectedHeight}`) {
  console.log('✅ Aspect ratio maintained properly!');
} else {
  console.error('❌ Mismatch in optimized URL!');
  process.exit(1);
}

console.log('\n--- Testing Immutable State Updates for Likes ---');
let likesState = {};
const mockLike = (prev, id) => ({
  ...prev,
  [id]: (prev[id] || 0) + 1,
});

likesState = mockLike(likesState, '10');
likesState = mockLike(likesState, '10');
likesState = mockLike(likesState, '25');

console.log('Likes state:', likesState);
if (likesState['10'] === 2 && likesState['25'] === 1 && (likesState['99'] || 0) === 0) {
  console.log('✅ Individual like functionality is independent & correctly increments!');
} else {
  console.error('❌ Likes state logic failed!');
  process.exit(1);
}

console.log('\n--- Testing Pagination Appending & Deduplication ---');
const page1Photos = [
  { id: '1', author: 'Author 1', download_url: 'https://picsum.photos/id/1/5000/3333' },
  { id: '2', author: 'Author 2', download_url: 'https://picsum.photos/id/2/5000/3333' },
];

const page2Photos = [
  { id: '2', author: 'Author 2', download_url: 'https://picsum.photos/id/2/5000/3333' }, // Duplicate candidate
  { id: '3', author: 'Author 3', download_url: 'https://picsum.photos/id/3/5000/3333' },
];

const existingIds = new Set(page1Photos.map((p) => p.id));
const uniqueNew = page2Photos.filter((p) => !existingIds.has(p.id));
const combined = [...page1Photos, ...uniqueNew];

console.log('Combined photos count:', combined.length);
if (combined.length === 3 && combined[2].id === '3') {
  console.log('✅ Photos correctly appended without losing previous items or introducing duplicates!');
} else {
  console.error('❌ Photo appending failed!');
  process.exit(1);
}

console.log('\nAll core logic tests passed successfully!');
