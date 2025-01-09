package greenpulse.ecocrops.ecocrops.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GeolocationService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Double> getLatLongFromLocation(String localisation) {
        String url = "https://nominatim.openstreetmap.org/search?format=json&q=" + localisation + ",Maroc";

        try {
            // Appeler l'API
            Map<String, Object>[] response = restTemplate.getForObject(url, Map[].class);

            if (response != null && response.length > 0) {
                // Extraire les coordonnées
                Map<String, Double> latLong = new HashMap<>();
                latLong.put("latitude", Double.parseDouble(response[0].get("lat").toString()));
                latLong.put("longitude", Double.parseDouble(response[0].get("lon").toString()));
                return latLong;
            }
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'appel à l'API de géocodage : " + e.getMessage(), e);
        }

        throw new RuntimeException("Localisation introuvable : " + localisation);
    }
}
