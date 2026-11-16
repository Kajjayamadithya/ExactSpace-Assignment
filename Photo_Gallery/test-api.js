import { fetchPhotos } from './src/services/photoService.js';

async function test() {
  try {
    console.log('Testing page 1 fetch...');
    const page1 = await fetchPhotos(1, 3);
    console.log(`Page 1 returned ${page1.length} photos.`);
    console.log(`Photo 0: id=${page1[0].id}, author="${page1[0].author}", url=${page1[0].download_url}`);

    console.log('\nTesting page 2 fetch...');
    const page2 = await fetchPhotos(2, 3);
    console.log(`Page 2 returned ${page2.length} photos.`);
    console.log(`Photo 0: id=${page2[0].id}, author="${page2[0].author}", url=${page2[0].download_url}`);

    if (page1[0].id !== page2[0].id) {
      console.log('✅ Page 1 and Page 2 have distinct items as expected!');
    }
  } catch (err) {
    console.error('Test error:', err);
  }
}

test();
