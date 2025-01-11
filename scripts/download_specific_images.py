import os
import requests

def download_image(url, output_path):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"Successfully downloaded image to {output_path}")
        return True
    
    except requests.RequestException as e:
        print(f"Error downloading image: {e}")
        return False

# Specific images for Thérapie Systémique and Thérapie Brève
images = {
    'therapie-systemique-hero.jpg': [
        'https://img.freepik.com/free-photo/family-therapy-session-with-counselor_23-2149073325.jpg',
        'https://img.freepik.com/free-photo/group-therapy-session-with-professional-counselor_23-2149073326.jpg',
        'https://img.freepik.com/free-photo/family-counseling-session-with-therapist_23-2149073327.jpg'
    ],
    'therapie-breve-hero.jpg': [
        'https://img.freepik.com/free-photo/therapist-taking-notes-during-brief-therapy-session_23-2149073328.jpg',
        'https://img.freepik.com/free-photo/solution-focused-therapy-session_23-2149073329.jpg',
        'https://img.freepik.com/free-photo/counselor-helping-client-solve-problems-quickly_23-2149073330.jpg'
    ]
}

output_dir = r'G:\projet-coach-holistique\public\images\approches\hero'

for filename, urls in images.items():
    output_path = os.path.join(output_dir, filename)
    
    for url in urls:
        if download_image(url, output_path):
            break
