import os
import json

def verify_images(base_path):
    # Paths to check
    image_paths = [
        '/images/approches/hero/therapie-systemique-hero.jpg',
        '/images/approches/hero/therapie-breve-hero.jpg'
    ]
    
    results = {}
    
    for path in image_paths:
        # Convert web path to filesystem path
        full_path = os.path.join(base_path, path.lstrip('/'))
        
        results[path] = {
            'exists': os.path.exists(full_path),
            'full_path': full_path,
            'file_size': os.path.getsize(full_path) if os.path.exists(full_path) else 0
        }
    
    print(json.dumps(results, indent=2))

# Adjust this path to your Next.js public directory
verify_images('G:\\projet-coach-holistique\\public')
