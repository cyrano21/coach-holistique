# Image Download Script

## Purpose
This script downloads images from specified URLs and saves them locally in the project's `public/images/approches` directory.

## Prerequisites
- Node.js installed
- Run `npm install` in the project root to ensure all dependencies are available

## Usage
1. Navigate to the project root directory
2. Run the script using Node.js:
   ```bash
   node scripts/download-images.js
   ```

## What the Script Does
- Downloads images from Pexels for therapeutic approaches
- Saves images with descriptive filenames
- Creates the necessary directory structure
- Handles potential download errors

## Notes
- Images are saved as .jpg files
- Local paths are used in the application to reference these images
- Ensure you have the rights to use these images in your project
