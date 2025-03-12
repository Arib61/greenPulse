import os
import sys
import json
from dotenv import load_dotenv
import google.generativeai as gen_ai

# Désactiver les logs inutiles de gRPC
os.environ["GRPC_VERBOSITY"] = "ERROR"
os.environ["GRPC_LOG_SEVERITY_LEVEL"] = "ERROR"

# Charger les variables d'environnement
load_dotenv()

# Récupération de la clé API
GOOGLE_API_KEY = "AIzaSyC9AwJ9Pm9smw_dR9tumHSX2AdFtOjTdSw"
if not GOOGLE_API_KEY:
    print(json.dumps({"error": "Clé API Google non définie"}))
    sys.stdout.flush()
    sys.exit(1)

# Configuration de Google Generative AI
try:
    gen_ai.configure(api_key=GOOGLE_API_KEY)
except Exception as e:
    print(json.dumps({"error": f"Erreur lors de la configuration de l'API : {str(e)}"}))
    sys.stdout.flush()
    sys.exit(1)

# Initialisation du modèle
try:
    model = gen_ai.GenerativeModel('gemini-1.5-pro')
    chat_session = model.start_chat(history=[])
except Exception as e:
    print(json.dumps({"error": f"Impossible de charger le modèle : {str(e)}"}))
    sys.stdout.flush()
    sys.exit(1)

def handle_request(user_input):
    """Traite une requête utilisateur avec le modèle Gemini et renvoie uniquement du JSON."""
    try:
        response = chat_session.send_message(user_input)
        return {"response": response.text}
    except Exception as e:
        return {"error": str(e)}

def main():
    """Boucle principale pour lire les entrées utilisateur et renvoyer une réponse JSON."""
    while True:
        try:
            user_input = sys.stdin.readline().strip()
            if not user_input:
                continue

            result = handle_request(user_input)
            print(json.dumps(result))
            sys.stdout.flush()

        except Exception as e:
            print(json.dumps({"error": f"Erreur système : {str(e)}"}))
            sys.stdout.flush()

if __name__ == "__main__":
    main()
