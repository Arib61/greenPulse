import sys
import json
import os
import requests
import pandas as pd

# OpenWeather API configuration
WEATHER_API_KEY = "9244a4e413b044e4129c17489091e08b"
WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

# Définir le répertoire de base où se trouve ce script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Chemin du fichier CSV pour les précipitations
CSV_FILE_PATH = os.path.join(BASE_DIR, "combined_data.csv")

# Vérification du fichier CSV
if not os.path.exists(CSV_FILE_PATH):
    print(json.dumps({"error": f"Fichier CSV introuvable: {CSV_FILE_PATH}"}))
    sys.exit(1)


# Fonction pour obtenir les données climatiques via l'API OpenWeather
def get_climatic_data(latitude, longitude):
    try:
        url = f"{WEATHER_BASE_URL}?lat={latitude}&lon={longitude}&appid={WEATHER_API_KEY}&units=metric"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            temperature = data["main"]["temp"]  # Température en Celsius
            humidity = data["main"]["humidity"]  # Humidité en pourcentage
            rain_probability = data.get("rain", {}).get("1h", 0)  # Probabilité de pluie (mm/h)
            return {"Temperature": temperature, "Humidity": humidity, "RainProbability": rain_probability}
        else:
            print(json.dumps({"error": f"Erreur API OpenWeather: {response.status_code}"}))
            return None
    except Exception as e:
        print(json.dumps({"error": f"Erreur lors de l'appel à OpenWeather API: {str(e)}"}))
        return None


# Fonction pour obtenir les précipitations depuis le fichier CSV
def get_rainfall_from_csv(latitude, longitude):
    try:
        df = pd.read_csv(CSV_FILE_PATH)
        rounded_lat, rounded_lon = round_coords(latitude, longitude)
        matching_row = df[(df['LAT'] == rounded_lat) & (df['LON'] == rounded_lon)]
        if not matching_row.empty:
            return matching_row['Mean'].values[0]
        else:
            print(json.dumps({"error": f"Aucune donnée trouvée pour Latitude: {rounded_lat}, Longitude: {rounded_lon}"}))
            return None
    except Exception as e:
        print(json.dumps({"error": f"Erreur lors de la lecture du fichier CSV : {str(e)}"}))
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


# Fonction principale pour récupérer les données climatiques
def get_climatic_parameters(latitude, longitude):
    climatic_data = get_climatic_data(latitude, longitude)
    if not climatic_data:
        return None

    rainfall = get_rainfall_from_csv(latitude, longitude)
    if rainfall is None:
        print(json.dumps({"error": "Impossible de récupérer les précipitations."}))
        return None

    return {
        "Temperature": float(climatic_data["Temperature"]),
        "Humidity": float(climatic_data["Humidity"]),
        "Rainfall": float(rainfall),
        "RainProbability": float(climatic_data["RainProbability"])
    }


# Point d'entrée principal
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Latitude et longitude sont nécessaires."}))
        sys.exit(1)

    try:
        latitude = float(sys.argv[1])
        longitude = float(sys.argv[2])
        parameters = get_climatic_parameters(latitude, longitude)
        if parameters:
            print(json.dumps(parameters))
        else:
            print(json.dumps({"error": "Impossible de récupérer les paramètres."}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
