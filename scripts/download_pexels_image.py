import os
import requests

def download_pexels_image(query, output_path, api_key='YOUR_PEXELS_API_KEY', per_page=1, page=1):
    headers = {
        'Authorization': api_key
    }
    
    params = {
        'query': query,
        'per_page': per_page,
        'page': page
    }
    
    try:
        response = requests.get('https://api.pexels.com/v1/search', headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data['total_results'] > 0:
            image_url = data['photos'][0]['src']['large']
            
            # Download the image
            image_response = requests.get(image_url)
            image_response.raise_for_status()
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            with open(output_path, 'wb') as f:
                f.write(image_response.content)
            
            print(f"Successfully downloaded image for {query}")
            return True
        else:
            print(f"No images found for {query}")
            return False
    
    except requests.RequestException as e:
        print(f"Error downloading image: {e}")
        return False

# Search queries for Thérapie Brève
queries = [
    "brief therapy counseling",
    "solution focused therapy",
    "short term psychological counseling",
    "problem solving therapy",
    "efficient therapy session"
]

# Output path
output_dir = r'G:\projet-coach-holistique\public\images\approches\hero'
output_filename = 'therapie-breve-hero.jpg'
output_path = os.path.join(output_dir, output_filename)

# Pexels API key (replace with your actual key)
PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY'

# Try different queries until an image is found
for query in queries:
    if download_pexels_image(query, output_path, PEXELS_API_KEY):
        break
