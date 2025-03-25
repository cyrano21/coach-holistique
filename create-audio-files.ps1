# Script pour créer tous les fichiers audio nécessaires pour l'EFT

# Liste des points de tapotement standards
$points = @(
    "sommet",
    "sourcil",
    "coin-oeil",
    "sous-oeil",
    "sous-nez",
    "menton",
    "clavicule",
    "sous-sein",
    "sous-bras",
    "sur-pouce",
    "pouce",          # Pour la compatibilité avec les anciennes références
    "point-gamme",
    "poignet"
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

Write-Host "Création des fichiers audio terminée avec succès!"
