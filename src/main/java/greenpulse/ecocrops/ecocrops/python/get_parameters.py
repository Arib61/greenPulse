import sys
import json
import os
import requests
import numpy as np
import pandas as pd

# OpenWeather API configuration
WEATHER_API_KEY = "9244a4e413b044e4129c17489091e08b"
WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

# Définir le répertoire de base où se trouve ce script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Répertoires contenant les fichiers `.npy`
EXPORT_DATA_N_DIR = os.path.join(BASE_DIR, "EXPORT_DATA", "export_data_N")
EXPORT_DATA_PH_DIR = os.path.join(BASE_DIR, "EXPORT_DATA", "export_data_PH2")
EXPORT_DATA_CEC_DIR = os.path.join(BASE_DIR, "EXPORT_DATA", "export_data_CEC")
EXPORT_DATA_C_DIR = os.path.join(BASE_DIR, "EXPORT_DATA", "export_data_C")

# Chemin du fichier CSV pour les précipitations
CSV_FILE_PATH = os.path.join(BASE_DIR, "combined_data.csv")

# Vérification des chemins
if not os.path.exists(CSV_FILE_PATH):
    print(f"Erreur : Fichier CSV introuvable : {CSV_FILE_PATH}")
    sys.exit(1)

for path in [EXPORT_DATA_N_DIR, EXPORT_DATA_PH_DIR, EXPORT_DATA_CEC_DIR, EXPORT_DATA_C_DIR]:
    if not os.path.exists(path):
        print(f"Erreur : Répertoire introuvable : {path}")
        sys.exit(1)


# Fonction pour convertir les types NumPy en types Python natifs
def convert_to_native_types(obj):
    """Convertit les types NumPy en types natifs pour JSON."""
    if isinstance(obj, np.generic):
        return obj.item()  # Convertit un scalaire NumPy en un type natif
    if isinstance(obj, dict):
        return {key: convert_to_native_types(value) for key, value in obj.items()}
    if isinstance(obj, list):
        return [convert_to_native_types(element) for element in obj]
    return obj


# Fonction pour lire une valeur à partir des fichiers `.npy`
def get_value_from_npy(lat, lon, data_dir):
    try:
        for file_name in os.listdir(data_dir):
            if file_name.endswith(".npy"):
                file_path = os.path.join(data_dir, file_name)
                data = np.load(file_path)
                return data[int(lat), int(lon)]
    except Exception as e:
        print(f"Erreur lors de la lecture des fichiers dans {data_dir}: {e}")
    return None


# Fonction pour obtenir les données climatiques via l'API OpenWeather
def get_climatic_data(latitude, longitude):
    try:
        url = f"{WEATHER_BASE_URL}?lat={latitude}&lon={longitude}&appid={WEATHER_API_KEY}&units=metric"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            temperature = data["main"]["temp"]  # Température en Celsius
            humidity = data["main"]["humidity"]  # Humidité en pourcentage
            return {"Temperature": temperature, "Humidity": humidity}
        else:
            print(f"Erreur lors de la récupération des données climatiques : {response.status_code}")
            return None
    except Exception as e:
        print(f"Erreur lors de l'appel à OpenWeather API: {e}")
        return None


# Fonction pour obtenir les précipitations depuis le fichier CSV
def get_rainfall_from_csv(latitude, longitude):
    try:
        df = pd.read_csv(CSV_FILE_PATH)

        # Arrondir latitude et longitude pour correspondre aux valeurs du fichier CSV
        rounded_lat, rounded_lon = round_coords(latitude, longitude)

        # Filtrer par latitude et longitude
        matching_row = df[(df['LAT'] == rounded_lat) & (df['LON'] == rounded_lon)]
        if not matching_row.empty:
            return matching_row['Mean'].values[0]
        else:
            print(f"Aucune donnée trouvée pour Latitude: {rounded_lat}, Longitude: {rounded_lon}")
            return None
    except Exception as e:
        print(f"Erreur lors de la lecture du fichier CSV : {e}")
        return None


# Fonction pour arrondir les coordonnées
def round_coords(lat, lon):
    lat_decimal = lat % 1
    if lat_decimal < 0.5:
        adjusted_lat = (int(lat) + 0.25)
    else:
        adjusted_lat = (int(lat) + 0.75)

    lon_decimal = lon % 1
    if lon_decimal < 0.5:
        adjusted_lon = (int(lon) + 0.25)
    else:
        adjusted_lon = (int(lon) + 0.75)

    return adjusted_lat, adjusted_lon


# Fonction principale pour récupérer tous les paramètres
def get_all_parameters(latitude, longitude):
    climatic_data = get_climatic_data(latitude, longitude)
    if not climatic_data:
        return None

    rainfall = get_rainfall_from_csv(latitude, longitude)
    if rainfall is None:
        print("Impossible de recuperer les précipitations.")
        return None

    nitrogen = get_value_from_npy(latitude, longitude, EXPORT_DATA_N_DIR)
    if nitrogen is None:
        print("Impossible de recuperer la valeur de N.")
        return None

    ph = get_value_from_npy(latitude, longitude, EXPORT_DATA_PH_DIR)
    if ph is None:
        print("Impossible de recuperer la valeur de pH.")
        return None

    cec = get_value_from_npy(latitude, longitude, EXPORT_DATA_CEC_DIR)
    if cec is None:
        print("Impossible de recuperer la valeur de CEC.")
        return None

    organic_carbon = get_value_from_npy(latitude, longitude, EXPORT_DATA_C_DIR)
    if organic_carbon is None:
        print("Impossible de recuperer la valeur de carbone organique.")
        return None

    # Combiner les résultats
    return {
        "Temperature": float(climatic_data["Temperature"]),
        "Humidity": float(climatic_data["Humidity"]),
        "Rainfall": float(rainfall),
        "N": float(nitrogen),
        "pH": float(ph),
        "CEC": float(cec),
        "OrganicCarbon": float(organic_carbon)
    }


# Point d'entrée principal
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Latitude et longitude sont nécessaires."}))
        sys.exit(1)

    try:
        latitude = float(sys.argv[1])
        longitude = float(sys.argv[2])
        parameters = get_all_parameters(latitude, longitude)
        if parameters:
            # Convertir les types NumPy en types natifs pour JSON
            parameters_native = convert_to_native_types(parameters)
            print(json.dumps(parameters_native))
        else:
            print(json.dumps({"error": "Impossible de récupérer les paramètres."}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
