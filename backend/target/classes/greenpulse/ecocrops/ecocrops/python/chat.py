import os
import sys
import json
from dotenv import load_dotenv
import google.generativeai as gen_ai
import logging
import absl.logging

# Désactiver les logs inutiles de gRPC
logging.root.removeHandler(absl.logging._absl_handler)
absl.logging._warn_preinit_stderr = False
os.environ["GRPC_VERBOSITY"] = "ERROR"
os.environ["GRPC_LOG_SEVERITY_LEVEL"] = "ERROR"


# Charger les variables d'environnement
load_dotenv()

# Configurer l'API Google Generative AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print(json.dumps({"error": "Clé API Google non définie"}))
    sys.stdout.flush()
    sys.exit(1)

gen_ai.configure(api_key=GOOGLE_API_KEY)

# Initialiser une session de chat persistante
try:
    model = gen_ai.GenerativeModel('gemini-1.5-pro')
    chat_session = model.start_chat(history=[])
except Exception as e:
    print(json.dumps({"error": f"Impossible de charger le modèle : {str(e)}"}))
    sys.stdout.flush()
    sys.exit(1)

def handle_request(user_input):
    try:
        # Envoyer la requête au modèle Gemini-Pro
        response = chat_session.send_message(user_input)
        return {"response": response.text}
    except Exception as e:
        return {"error": f"Erreur du modèle : {str(e)}"}

def main():
    while True:
        try:
            # Lire l'entrée utilisateur
            user_input = sys.stdin.readline().strip()
            if not user_input:
                continue

            # Traiter la requête et renvoyer une réponse JSON
            result = handle_request(user_input)
            print(json.dumps(result))
            sys.stdout.flush()
        except Exception as e:
            print(json.dumps({"error": f"Erreur système : {str(e)}"}))
            sys.stdout.flush()

if __name__ == "__main__":
    main()
