# Script pour créer des fichiers audio vides et une image par défaut
# Création de l'image par défaut pour les points de tapotement
$defaultImagePath = ".\public\images\default-point.png"
if (-not (Test-Path $defaultImagePath)) {
    New-Item -Path $defaultImagePath -ItemType File -Force
}

# Liste des points de tapotement
$points = @(
    "sommet",
    "sourcil",
    "coin-oeil",
    "sous-oeil",
    "sous-nez",
    "menton",
    "clavicule",
    "sous-bras",
    "sous-sein",
    "sur-pouce"
)

# Liste des catégories d'émotions
$emotions = @(
    "colere",
    "anxiete",
    "tristesse",
    "peur",
    "stress",
    "culpabilite",
    "honte",
    "ressentiment"
)

# Création des fichiers audio vides pour chaque point dans chaque catégorie
foreach ($emotion in $emotions) {
    $emotionDir = ".\public\audio\$emotion"
    if (-not (Test-Path $emotionDir)) {
        New-Item -Path $emotionDir -ItemType Directory -Force
    }
    
    foreach ($point in $points) {
        $audioPath = "$emotionDir\$point.mp3"
        if (-not (Test-Path $audioPath)) {
            New-Item -Path $audioPath -ItemType File -Force
        }
    }
}

# Création des images manquantes pour les points de tapotement
foreach ($point in $points) {
    $imagePath = ".\public\images\points\$point.jpg"
    $webpPath = ".\public\images\points\$point.webp"
    
    # Vérifie si l'image existe déjà en format jpg ou webp
    if (-not ((Test-Path $imagePath) -or (Test-Path $webpPath))) {
        # Si l'image n'existe pas, créer un fichier vide
        New-Item -Path $imagePath -ItemType File -Force
    }
}

Write-Host "Création des ressources terminée avec succès!"
