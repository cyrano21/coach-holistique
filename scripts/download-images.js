const fs = require('fs');
const path = require('path');
const https = require('https');

// Define a list of image descriptions and their corresponding URLs
const imageData = [
  {
    key: 'analyseTransactionnelle',
    description: 'Analyse Transactionnelle',
    searchTerms: ['psychology', 'counseling', 'therapy']
  },
  {
    key: 'pnl',
    description: 'PNL Programmation Neuro-Linguistique',
    searchTerms: ['communication', 'coaching', 'personal development']
  },
  {
    key: 'sophrologie',
    description: 'Sophrologie Relaxation',
    searchTerms: ['meditation', 'relaxation', 'wellness']
  },
  {
    key: 'eft',
    description: 'EFT Emotional Freedom Techniques',
    searchTerms: ['healing', 'emotional', 'therapy']
  },
  {
    key: 'visualisation',
    description: 'Visualisation Mentale',
    searchTerms: ['mindfulness', 'visualization', 'mental training']
  },
  {
    key: 'meditation',
    description: 'Méditation',
    searchTerms: ['meditation', 'mindfulness', 'calm']
  },
  {
    key: 'tcc',
    description: 'Thérapie Cognitivo-Comportementale',
    searchTerms: ['psychology', 'therapy', 'cognitive']
  },
  {
    key: 'systemique',
    description: 'Thérapie Systémique',
    searchTerms: ['family', 'therapy', 'relationships']
  },
  {
    key: 'humaniste',
    description: 'Thérapie Humaniste',
    searchTerms: ['personal growth', 'counseling', 'self-improvement']
  },
  {
    key: 'psychanalytique',
    description: 'Thérapie Psychanalytique',
    searchTerms: ['psychology', 'freud', 'counseling']
  },
  {
    key: 'therapieBrieve',
    description: 'Thérapie Brève',
    searchTerms: ['solution', 'focused', 'therapy']
  },
  {
    key: 'therapieCouple',
    description: 'Thérapie de Couple',
    searchTerms: ['relationship', 'counseling', 'communication']
  }
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'approches');
const thumbnailsDir = path.join(outputDir, 'thumbnails');

// Ensure output directories exist
[outputDir, thumbnailsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to download image from Unsplash
function downloadUnsplashImage(searchTerm, filename, outputPath) {
  return new Promise((resolve, reject) => {
    const clientId = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace with actual key
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchTerm)}&client_id=${clientId}&orientation=squarish&count=1`;

    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          if (jsonResponse.length > 0) {
            const imageUrl = jsonResponse[0].urls.regular;

            https.get(imageUrl, (imageResponse) => {
              if (imageResponse.statusCode === 200) {
                const fileStream = fs.createWriteStream(outputPath);
                imageResponse.pipe(fileStream);

                fileStream.on('finish', () => {
                  fileStream.close();
                  console.log(`✅ Downloaded ${filename}`);
                  resolve(outputPath);
                });
              } else {
                reject(new Error(`Failed to download image. Status code: ${imageResponse.statusCode}`));
              }
            });
          } else {
            reject(new Error('No images found for the search term'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.time('🕒 Total Download Time');
  
  try {
    const downloadPromises = imageData.map(async (image) => {
      const filename = `${image.key}.jpg`;
      const outputPath = path.join(outputDir, filename);
      
      // Try each search term until an image is found
      for (const searchTerm of image.searchTerms) {
        try {
          await downloadUnsplashImage(searchTerm, filename, outputPath);
          return; // Exit loop if download successful
        } catch (error) {
          console.warn(`Failed to download with term "${searchTerm}":`, error.message);
        }
      }
      
      throw new Error(`Could not download image for ${image.key}`);
    });

    await Promise.all(downloadPromises);
    
    console.timeEnd('🕒 Total Download Time');
    console.log('✨ All images downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading images:', error);
    process.exit(1);
  }
}

// Run the download
downloadAllImages();
