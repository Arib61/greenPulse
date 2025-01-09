import pickle
import numpy as np
import sys
import json
import warnings

warnings.filterwarnings("ignore")

# Charger le modèle et le scaler depuis le fichier
with open("src\\main\\java\\greenpulse\\ecocrops\\ecocrops\\python\\model_and_scaler.pkl", "rb") as file:
    data = pickle.load(file)
    model = data["model"]
    scaler = data["scaler"]

def recommend(input_data):
    # Étape 1 : Convertir les données en tableau 2D
    features = np.array(input_data).reshape(1, -1)
    
    # Étape 2 : Appliquer la transformation (échelle)
    transformed_features = scaler.transform(features)
    
    # Étape 3 : Obtenir les probabilités pour chaque classe
    probabilities = model.predict_proba(transformed_features)[0]
    
    # Étape 4 : Trier les classes par probabilités décroissantes
    top_3_indices = np.argsort(probabilities)[::-1][:3]
    
    # Étape 5 : Charger les noms des cultures
    crop_dict = {
        'Ble': 1,
        'Tomates': 2,
        'Pasteque': 3,
        'Poivre': 4,
        'Chou': 5,
        'Canne a sucre': 6,
        'Betterave': 7,
        'Pois': 8,
        'Haricot': 9,
        'Tournesol': 10,
        'Soja': 11,
        'Oliviers': 12,
        'Arachide': 13,
        'Raisin': 14,
        'Agrumes': 15,
        'Banane': 16,
        'Mais': 17,
        'Oignon': 18,
        'pommes_de_terre': 19,
        'Coton': 20
    }
    crop_dict_reversed = {v - 1: k for k, v in crop_dict.items()}
    top_3_crops = [(crop_dict_reversed.get(idx, "Unknown Crop"), probabilities[idx]) for idx in top_3_indices]
    
    # Étape 6 : Retourner le résultat
    return {"best_crop": top_3_crops[0][0], "top_3": top_3_crops}

if __name__ == "__main__":
    # Vérifier si des arguments sont passés
    if len(sys.argv) > 1:
        # Lire les arguments passés depuis la ligne de commande
        input_data = list(map(float, sys.argv[1:]))
    else:
        # Sinon, utilisez une valeur par défaut pour le test
        input_data = [7.11, 170.26, 11.49, 58.16, 880.33, 28.49, 1.76]

    # Obtenir les recommandations
    result = recommend(input_data)

    # Imprimer les résultats au format JSON
    print(json.dumps(result))
