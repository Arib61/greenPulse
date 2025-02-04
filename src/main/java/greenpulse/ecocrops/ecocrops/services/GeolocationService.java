package greenpulse.ecocrops.ecocrops.services;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeolocationService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Double> getLatLongFromLocation(String localisation) {
        try {
            // ✅ 1. Nettoyer l'adresse en enlevant les codes postaux et chiffres
            String cleanedLocation = localisation.replaceAll("[0-9]", "").trim();

            // ✅ 2. Essayer d'abord avec l'adresse complète
            Map<String, Double> coordinates = fetchCoordinates(cleanedLocation);
            if (coordinates != null) {
                return coordinates;
            }

            // ✅ 3. Si l'adresse complète échoue, essayer une version simplifiée (1er élément)
            String simplifiedLocation = cleanedLocation.split(",")[0].trim();
            coordinates = fetchCoordinates(simplifiedLocation);
            if (coordinates != null) {
                return coordinates;
            }

        } catch (Exception e) {
            System.err.println("Erreur API Géolocalisation : " + e.getMessage());
        }

        // ✅ 4. Si aucune adresse ne fonctionne, retourner Casablanca par défaut
        System.out.println("Localisation non trouvée, utilisation de Casablanca par défaut.");
        Map<String, Double> defaultLatLong = new HashMap<>();
        defaultLatLong.put("latitude", 33.5731);
        defaultLatLong.put("longitude", -7.5898);
        return defaultLatLong;
    }

    // ✅ Nouvelle méthode pour envoyer la requête et récupérer les coordonnées
    private Map<String, Double> fetchCoordinates(String location) {
        try {
            String encodedLocation = URLEncoder.encode(location, StandardCharsets.UTF_8);
            String url = "https://nominatim.openstreetmap.org/search?format=json&countrycodes=MA&q=" + encodedLocation;

            // ✅ Appeler l'API OpenStreetMap
            Map<String, Object>[] response = restTemplate.getForObject(url, Map[].class);
            System.out.println("Réponse OpenStreetMap pour [" + location + "] : " + Arrays.toString(response));

            // ✅ Vérifier si les données sont valides
            if (response != null && response.length > 0 && response[0].containsKey("lat") && response[0].containsKey("lon")) {
                Map<String, Double> latLong = new HashMap<>();
                latLong.put("latitude", Double.parseDouble(response[0].get("lat").toString()));
                latLong.put("longitude", Double.parseDouble(response[0].get("lon").toString()));
                return latLong;
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de la requête OpenStreetMap pour [" + location + "] : " + e.getMessage());
        }

        return null;
    }
}
