package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.models.ParametresChimique;
import greenpulse.ecocrops.ecocrops.models.ParametresClimatique;
import greenpulse.ecocrops.ecocrops.repository.ParametresChimiqueRepository;
import greenpulse.ecocrops.ecocrops.repository.ParametresClimatiqueRepository;
import greenpulse.ecocrops.ecocrops.repository.SoleRepository;
import greenpulse.ecocrops.ecocrops.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SoleService {

    private final SoleRepository soleRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final ParametresChimiqueRepository parametresChimiqueRepository;
    private final ParametresClimatiqueRepository parametresClimatiqueRepository;
    private final GeolocationService geolocationService;
    private final PythonRecommendationService2 pythonRecommendationService2;

    // Créer une nouvelle sole
    public Sole createSole(double superficie, String localisation, Integer agriculteurId) {
        // Vérifier que l'agriculteur existe
        Utilisateur agriculteur = utilisateurRepository.findById(agriculteurId)
                .orElseThrow(() -> new RuntimeException("Agriculteur introuvable avec l'ID : " + agriculteurId));

        if (!"agriculteur".equalsIgnoreCase(agriculteur.getTypeUtilisateur().name())) {
            throw new IllegalArgumentException("L'utilisateur avec l'ID : " + agriculteurId + " n'est pas un agriculteur");
        }

        // Récupérer la latitude et longitude à partir de la localisation
        Map<String, Double> latLong = geolocationService.getLatLongFromLocation(localisation);

        // Créer la nouvelle sole
        Sole sole = new Sole();
        sole.setSuperficie(superficie);
        sole.setLocalisation(localisation);
        sole.setLatitude(latLong.get("latitude"));
        sole.setLongitude(latLong.get("longitude"));
        sole.setAgriculteur(agriculteur);

        // Sauvegarder la sole dans la base de données
        Sole savedSole = soleRepository.save(sole);

        Map<String, Double> parameters = pythonRecommendationService2.getParameters(
            sole.getLatitude(),
            sole.getLongitude()
        );

        ParametresClimatique  details_climatique = new ParametresClimatique();
        ParametresChimique details_chimique = new ParametresChimique();

        details_chimique.setSole(savedSole);
        details_chimique.setPH(getDoubleValue(parameters, "pH", 7.0));
        details_chimique.setNitrogen(getDoubleValue(parameters, "N", 0.0));
        details_chimique.setCationExchangeCapacity(getDoubleValue(parameters, "CEC", 0.0));
        details_chimique.setOrganicCarbon(getDoubleValue(parameters, "OrganicCarbon", 0.0));
        
        details_climatique.setSole(savedSole);
        details_climatique.setHumidity(getDoubleValue(parameters, "Humidity", 50.0));
        details_climatique.setRainfall(getDoubleValue(parameters, "Rainfall", 0.0));
        details_climatique.setTemperature(getDoubleValue(parameters, "Temperature", 20.0));
        details_climatique.setRainProbability(getDoubleValue(parameters, "f", 0.2));


        

        parametresClimatiqueRepository.save(details_climatique);
        parametresChimiqueRepository.save(details_chimique);


        return savedSole;
    }

    // Récupérer une sole par son ID
    public Optional<Sole> getSoleById(Integer id) {
        return soleRepository.findById(id); // Retourne un Optional
    }
    

    // Récupérer toutes les soles
    public List<Sole> getAllSoles() {
        return soleRepository.findAll();
    }

    // Mettre à jour une sole existante
    public Sole updateSole(Integer id, double superficie, String localisation) {
        return soleRepository.findById(id).map(sole -> {
            sole.setSuperficie(superficie);
            sole.setLocalisation(localisation);

            // Mettre à jour les coordonnées en utilisant le GeolocationService
            Map<String, Double> latLong = geolocationService.getLatLongFromLocation(localisation);
            sole.setLatitude(latLong.get("latitude"));
            sole.setLongitude(latLong.get("longitude"));

            return soleRepository.save(sole);
        }).orElseThrow(() -> new RuntimeException("Sole introuvable avec l'ID : " + id));
    }

    // Supprimer une sole par son ID
    public boolean deleteSole(Integer id) {
        if (soleRepository.existsById(id)) {
            soleRepository.deleteById(id);
            return true;
        }
        throw new RuntimeException("Sole introuvable avec l'ID : " + id);
    }

    public List<Sole> getSolesByAgriculteurId(Integer agriculteurId) {
        Utilisateur agriculteur = utilisateurRepository.findById(agriculteurId)
            .orElseThrow(() -> new RuntimeException("Agriculteur introuvable avec l'ID : " + agriculteurId));
        
        return soleRepository.findByAgriculteur(agriculteur);
    }

    private Double getDoubleValue(Map<String, Double> parameters, String key, double defaultValue) {
        if (parameters.containsKey(key)) {
            Object value = parameters.get(key);
            if (value instanceof Number) {
                return ((Number) value).doubleValue();
            }
        }
        return defaultValue;
    }

    

    
    
}
