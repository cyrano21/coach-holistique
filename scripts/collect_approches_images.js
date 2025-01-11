const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// API Keys (replace with your actual keys)
const UNSPLASH_API_KEY = 'W-EwMi8dtMBH7QwfuKtRkl6OVrM3d7rwVc0SmDNCt8M';
const DEEPAI_API_KEY = '07df41d2-99c7-4398-a048-f8074a87ee99';

// Therapeutic approaches with expanded search terms
const therapeuticApproaches = [
  {
    key: 'Analyse Transactionnelle',
    searchTerms: [
      'transactional analysis psychology', 
      'communication psychology', 
      'interpersonal relationships', 
      'psychological counseling', 
      'personal development'
    ],
    aiPrompts: [
      'Professional counseling session showing communication',
      'People interacting with empathy and understanding',
      'Psychology of human interactions'
    ]
  },
  {
    key: 'PNL Programmation Neuro-Linguistique',
    searchTerms: [
      'neuro linguistic programming', 
      'communication skills', 
      'personal transformation', 
      'coaching psychology', 
      'mind communication techniques'
    ],
    aiPrompts: [
      'Brain communication and language processing',
      'Coaching session with positive transformation',
      'Neurolinguistic techniques for personal growth'
    ]
  },
  {
    key: 'Sophrologie',
    searchTerms: [
      'relaxation techniques', 
      'stress management', 
      'meditation practice', 
      'mental wellness', 
      'body mind relaxation'
    ],
    aiPrompts: [
      'Peaceful relaxation and mindfulness',
      'Person practicing deep breathing',
      'Calm and serene mental wellness'
    ]
  },
  {
    key: 'EFT Emotional Freedom Techniques',
    searchTerms: [
      'emotional healing', 
      'stress relief techniques', 
      'psychological tapping', 
      'emotional wellness', 
      'mind body healing'
    ],
    aiPrompts: [
      'Emotional healing through tapping',
      'Person releasing emotional stress',
      'Holistic emotional freedom techniques'
    ]
  },
  {
    key: 'Visualisation Mentale',
    searchTerms: [
      'mental imagery', 
      'visualization techniques', 
      'guided meditation', 
      'mental training', 
      'cognitive visualization'
    ],
    aiPrompts: [
      'Mental visualization and goal setting',
      'Person practicing guided imagery',
      'Powerful mental visualization techniques'
    ]
  },
  {
    key: 'Méditation',
    searchTerms: [
      'mindfulness meditation', 
      'zen practice', 
      'meditation techniques', 
      'mental clarity', 
      'spiritual meditation'
    ],
    aiPrompts: [
      'Deep meditation and inner peace',
      'Person in peaceful meditation pose',
      'Mindfulness and spiritual connection'
    ]
  },
  {
    key: 'Thérapie Cognitivo-Comportementale',
    searchTerms: [
      'cognitive behavioral therapy', 
      'psychological counseling', 
      'mental health treatment', 
      'behavior modification', 
      'cognitive psychology'
    ],
    aiPrompts: [
      'Cognitive therapy session',
      'Understanding mental health processes',
      'Professional psychological counseling'
    ]
  },
  {
    key: 'Thérapie Systémique',
    searchTerms: [
      'family systems therapy', 
      'relationship counseling', 
      'systemic approach psychology', 
      'family dynamics', 
      'interpersonal therapy',
      'group therapy dynamics',
      'family counseling techniques',
      'systemic family intervention',
      'therapeutic family systems'
    ],
    aiPrompts: [
      'Family therapy and communication',
      'Interconnected relationships healing',
      'Systemic approach to psychological wellness',
      'Multiple people in a supportive therapy session',
      'Complex family dynamics counseling'
    ]
  },
  {
    key: 'Thérapie Humaniste',
    searchTerms: [
      'humanistic psychology', 
      'personal growth therapy', 
      'self-actualization', 
      'existential counseling', 
      'holistic personal development'
    ],
    aiPrompts: [
      'Personal growth and self-discovery',
      'Empathetic psychological counseling',
      'Holistic human potential development'
    ]
  },
  {
    key: 'Thérapie Psychanalytique',
    searchTerms: [
      'psychoanalysis therapy', 
      'depth psychology', 
      'unconscious mind exploration', 
      'freudian psychology', 
      'psychological interpretation'
    ],
    aiPrompts: [
      'Deep psychological exploration',
      'Understanding unconscious patterns',
      'Psychoanalytic therapy session'
    ]
  },
  {
    key: 'Thérapie Brève',
    searchTerms: [
      'brief solution focused therapy', 
      'short term counseling', 
      'problem solving therapy', 
      'rapid psychological intervention', 
      'goal oriented therapy',
      'solution-focused brief therapy',
      'time-limited psychological support',
      'targeted counseling approach',
      'efficient therapeutic intervention'
    ],
    aiPrompts: [
      'Focused problem-solving therapy',
      'Quick psychological intervention',
      'Efficient counseling techniques',
      'Targeted therapeutic session',
      'Rapid psychological transformation'
    ]
  },
  {
    key: 'Thérapie de Couple',
    searchTerms: [
      'couples therapy', 
      'relationship counseling', 
      'marriage therapy', 
      'interpersonal communication', 
      'relationship healing'
    ],
    aiPrompts: [
      'Couple in supportive therapy session',
      'Healing relationship dynamics',
      'Effective communication in relationships'
    ]
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

// Generate unique filename
function generateUniqueFilename(theme) {
  const uniqueId = uuidv4();
  return `${theme.toLowerCase().replace(/\s+/g, '_')}_${uniqueId}.jpg`;
}

// Download image
async function downloadImage(url, filePath) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
    throw error;
  }
}

// Collect images from Unsplash with multiple search terms
async function collectImagesFromUnsplash(approach, count = 10) {
  const downloadedImages = [];

  for (const searchTerm of approach.searchTerms) {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_API_KEY}`
        },
        params: {
          query: searchTerm,
          per_page: Math.ceil(count / approach.searchTerms.length),
          orientation: 'landscape'
        }
      });

      const imagePromises = response.data.results.slice(0, count - downloadedImages.length).map(async (result) => {
        const filename = generateUniqueFilename(approach.key);
        const filePath = path.join(outputDir, filename);
        
        try {
          await downloadImage(result.urls.regular, filePath);
          console.log(`Downloaded ${filename} for theme: ${approach.key} (search term: ${searchTerm})`);
          return filename;
        } catch (error) {
          console.error(`Failed to download image for ${approach.key}: ${error.message}`);
          return null;
        }
      });

      const newImages = await Promise.all(imagePromises);
      downloadedImages.push(...newImages.filter(img => img !== null));

      if (downloadedImages.length >= count) break;
    } catch (error) {
      console.error(`Error searching Unsplash for ${approach.key} with term "${searchTerm}":`, error.message);
    }
  }

  return downloadedImages;
}

// Collect AI-generated images with error handling and multiple prompts
async function collectImagesFromAI(approach, count = 5) {
  const downloadedImages = [];

  for (const prompt of approach.aiPrompts) {
    try {
      const response = await axios.post('https://api.deepai.org/api/text2img', 
        { text: prompt },
        {
          headers: {
            'api-key': DEEPAI_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      const imageUrl = response.data.output_url;
      const filename = generateUniqueFilename(`${approach.key}_ai`);
      const filePath = path.join(outputDir, filename);

      try {
        await downloadImage(imageUrl, filePath);
        console.log(`Downloaded AI image ${filename} for theme: ${approach.key} (prompt: ${prompt})`);
        downloadedImages.push(filename);

        if (downloadedImages.length >= count) break;
      } catch (downloadError) {
        console.error(`Failed to download AI image for ${approach.key}: ${downloadError.message}`);
      }
    } catch (error) {
      console.error(`Error generating AI image for ${approach.key} with prompt "${prompt}":`, 
        error.response ? error.response.data : error.message
      );
    }
  }

  return downloadedImages;
}

// Main function to collect images
async function collectTherapeuticApproachImages() {
  console.time('Image Collection');
  
  const collectionResults = {};

  for (const approach of therapeuticApproaches) {
    console.log(`Collecting images for: ${approach.key}`);
    
    const unsplashImages = await collectImagesFromUnsplash(approach);
    const aiImages = await collectImagesFromAI(approach);

    collectionResults[approach.key] = {
      unsplashImages,
      aiImages
    };
  }

  console.timeEnd('Image Collection');
  return collectionResults;
}

// Run the image collection
collectTherapeuticApproachImages()
  .then(results => {
    console.log('Image collection completed');
    console.log(JSON.stringify(results, null, 2));
    
    // Optional: Write results to a JSON file
    fs.writeFileSync(
      path.join(outputDir, 'image_collection_results.json'), 
      JSON.stringify(results, null, 2)
    );
  })
  .catch(error => {
    console.error('Error in image collection:', error);
  });

module.exports = { collectTherapeuticApproachImages };
