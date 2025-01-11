import requests
import os
import cv2
import uuid

# Clés API
unsplash_api_key = 'W-EwMi8dtMBH7QwfuKtRkl6OVrM3d7rwVc0SmDNCt8M'
deepai_api_key = '07df41d2-99c7-4398-a048-f8074a87ee99'

# En-têtes pour les requêtes API
unsplash_headers = {
    'Authorization': f'Client-ID {unsplash_api_key}'
}

deepai_headers = {
    'api-key': deepai_api_key
}

# Dossier principal pour sauvegarder les images
base_dir = r'F:\Images collections\collect images by theme with ai'
if not os.path.exists(base_dir):
    os.makedirs(base_dir)

# Fonction pour télécharger une image
def download_image(url, file_path):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(file_path, 'wb') as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)
        return True
    return False

# Fonction pour vérifier si une image contient des visages
def contains_faces(image_path):
    try:
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        image = cv2.imread(image_path)
        if image is None:
            print(f"Failed to load image {image_path}")
            return False
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
        print(f"Detected {len(faces)} faces in image {image_path}")
        return len(faces) > 0
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        return False

# Fonction pour générer un nom de fichier unique
def generate_unique_filename(theme_dir, base_name):
    unique_id = str(uuid.uuid4())
    file_name = f"{base_name}_{unique_id}.jpg"
    return file_name

# Collecter les images pour un thème donné depuis Unsplash
def collect_images_unsplash(theme, count):
    page = 1
    downloaded = 0

    # Créer un dossier pour le thème
    theme_dir = os.path.join(base_dir, theme)
    if not os.path.exists(theme_dir):
        os.makedirs(theme_dir)

    while downloaded < count:
        try:
            response = requests.get(f'https://api.unsplash.com/search/photos?page={page}&query={theme}&per_page=30&orientation=landscape', headers=unsplash_headers)
            print(f'Response Status Code: {response.status_code}')  # Debug: voir le statut de la réponse
            if response.status_code != 200:
                print(f'Error fetching images for theme {theme}: {response.status_code}')
                break

            data = response.json()
            print(f'Page {page} data: {data}')  # Debug: voir la réponse JSON

            for result in data['results']:
                if downloaded >= count:
                    break

                image_url = result['urls']['full']
                file_name = generate_unique_filename(theme_dir, f'{theme}_image')
                file_path = os.path.join(theme_dir, file_name)
                if download_image(image_url, file_path):
                    print(f'Downloaded: {file_name}')
                    if contains_faces(file_path):
                        print(f'Image {file_name} contains faces. Deleting...')
                        os.remove(file_path)
                    else:
                        downloaded += 1

            page += 1
        except KeyboardInterrupt:
            print("Script interrupted by user.")
            break
        except Exception as e:
            print(f"Error during processing: {e}")
            break

# Collecter des images générées par IA pour un thème donné
def collect_images_ai(theme, count):
    downloaded = 0

    # Créer un dossier pour le thème IA
    theme_dir = os.path.join(base_dir, f'{theme}_AI')
    if not os.path.exists(theme_dir):
        os.makedirs(theme_dir)

    while downloaded < count:
        try:
            response = requests.post(
                'https://api.deepai.org/api/text2img',
                headers=deepai_headers,
                data={'text': theme}
            )
            print(f'Response Status Code: {response.status_code}')  # Debug: voir le statut de la réponse
            if response.status_code != 200:
                print(f'Error generating images for theme {theme}: {response.status_code}')
                break

            data = response.json()
            image_url = data['output_url']
            file_name = generate_unique_filename(theme_dir, f'{theme}_ai_image')
            file_path = os.path.join(theme_dir, file_name)
            if download_image(image_url, file_path):
                print(f'Downloaded: {file_name}')
                downloaded += 1
        except KeyboardInterrupt:
            print("Script interrupted by user.")
            break
        except Exception as e:
            print(f"Error during processing: {e}")
            break

# Thèmes à rechercher
themes = ['nature', 'technology', 'science', 'well-being', 'philosophy', 'spirituality', 'quantum physics', 'geology', 'universe']

# Nombre d'images par thème
images_per_theme_unsplash = 200
images_per_theme_ai = 300

# Collecter les images pour chaque thème depuis Unsplash
for theme in themes:
    print(f'Collecting images for theme: {theme} from Unsplash')
    collect_images_unsplash(theme, images_per_theme_unsplash)

# Collecter les images générées par IA pour chaque thème
for theme in themes:
    print(f'Collecting images for theme: {theme} from AI generator')
    collect_images_ai(theme, images_per_theme_ai)
