import os

hero_dir = r'G:\projet-coach-holistique\public\images\approches\hero'

# Rename files
rename_map = {
    'thérapie-systémique-hero.jpg': 'therapie-systemique-hero.jpg',
    'therapie-breve-hero.jpg': 'therapie-breve-hero.jpg'  # Just to ensure consistency
}

for old_name, new_name in rename_map.items():
    old_path = os.path.join(hero_dir, old_name)
    new_path = os.path.join(hero_dir, new_name)
    
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f'Renamed {old_name} to {new_name}')
