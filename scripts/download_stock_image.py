import os
import requests
import uuid

def download_image(url, output_path):
    try:
        # Download the image
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"Successfully downloaded image to {output_path}")
        return True
    
    except requests.RequestException as e:
        print(f"Error downloading image: {e}")
        return False

# Curated list of stock image URLs for brief therapy
stock_image_urls = [
    # Solution-focused therapy images
    "https://img.freepik.com/free-photo/therapist-taking-notes-during-therapy-session_23-2149073320.jpg",
    "https://img.freepik.com/free-photo/psychologist-talking-with-patient-therapy-session_23-2149073321.jpg",
    "https://img.freepik.com/free-photo/counselor-listening-patient-during-therapy-session_23-2149073322.jpg",
    "https://img.freepik.com/free-photo/mental-health-professional-taking-notes-during-consultation_23-2149073323.jpg",
    "https://img.freepik.com/free-photo/therapist-providing-support-guidance-patient_23-2149073324.jpg"
]

# Output path
output_dir = r'G:\projet-coach-holistique\public\images\approches\hero'
output_filename = 'therapie-breve-hero.jpg'
output_path = os.path.join(output_dir, output_filename)

# Try downloading from the list of URLs
for url in stock_image_urls:
    if download_image(url, output_path):
        break
else:
    print("Could not download an image from any of the provided URLs.")
