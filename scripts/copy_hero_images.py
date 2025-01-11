import os
import shutil

source_dir = r'G:\projet-coach-holistique\public\images\approches'
hero_dir = r'G:\projet-coach-holistique\public\images\approches\hero'

# Create hero directory if it doesn't exist
os.makedirs(hero_dir, exist_ok=True)

# Hero images mapping
hero_images = {
    'Thérapie Systémique': 'thérapie_systémique_72c64e25-140e-4238-aee1-bf63c7e0560a.jpg',
    'Thérapie Brève': None  # We'll handle this manually
}

for approach, filename in hero_images.items():
    if filename:
        src_path = os.path.join(source_dir, filename)
        dest_path = os.path.join(hero_dir, f'{approach.lower().replace(" ", "-")}-hero.jpg')
        
        if os.path.exists(src_path):
            shutil.copy2(src_path, dest_path)
            print(f'Copied {filename} to {dest_path}')
        else:
            print(f'Source file not found: {src_path}')
