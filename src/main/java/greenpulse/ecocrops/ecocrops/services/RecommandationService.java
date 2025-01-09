package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.DTO.CultureRecommandationDTO;
import greenpulse.ecocrops.ecocrops.DTO.RecommandationDTO;
import greenpulse.ecocrops.ecocrops.models.Culture;
import greenpulse.ecocrops.ecocrops.models.CultureRecommandation;
import greenpulse.ecocrops.ecocrops.models.Recommandation;
import greenpulse.ecocrops.ecocrops.models.RecommandationDetails;
import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.repository.CultureRecommandationRepository;
import greenpulse.ecocrops.ecocrops.repository.CultureRepository;
import greenpulse.ecocrops.ecocrops.repository.RecommandationDetailsRepository;
import greenpulse.ecocrops.ecocrops.repository.RecommandationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecommandationService {

    private final PythonRecommendationService pythonRecommendationService;
    private final PythonRecommendationService2 pythonRecommendationService2;
    private final RecommandationRepository recommandationRepository;
    private final CultureRepository cultureRepository;
    private final CultureRecommandationRepository cultureRecommandationRepository;
    private final RecommandationDetailsRepository recommandationDetailsRepository;

    /**
     * Récupérer les paramètres nécessaires (pH, N, CEC, etc.) depuis les coordonnées.
     */
    public Map<String, Double> getParametersFromCoordinates(double latitude, double longitude) {
        // Appeler le script Python pour extraire les paramètres
        try {
            return pythonRecommendationService2.getParameters(latitude, longitude);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la récupération des paramètres : " + e.getMessage());
        }
    }

    /**
     * Créer une nouvelle recommandation et enregistrer ses détails (RecommandationDetails).
     */
    private Double getDoubleValue(Map<String, Double> parameters, String key, double defaultValue) {
        if (parameters.containsKey(key)) {
            Object value = parameters.get(key); // Obtenez l'objet brut
            if (value instanceof Number) {
                return ((Number) value).doubleValue(); // Convertissez en Double
            }
        }
        return defaultValue; // Utilisez la valeur par défaut si la clé est absente ou non valide
    }
    
    

    
    @Transactional
    public Recommandation createRecommandationFromParameters(Map<String, Double> parameters, Sole sole) {
        // Créer une nouvelle entité Recommandation
        Recommandation recommandation = new Recommandation();
        recommandation.setDetails("Recommandation générée pour la Sole ID " + sole.getId());
        recommandation.setAgronomeId(sole.getAgronome().getId());

        // Sauvegarder la recommandation dans la base de données
        Recommandation savedRecommandation = recommandationRepository.save(recommandation);

        // Créer les détails de la recommandation associés à cette sole
        RecommandationDetails details = new RecommandationDetails();
        details.setRecommandation(savedRecommandation);
        details.setSole(sole);

        // Ajouter les paramètres avec gestion des valeurs manquantes
        details.setPH(getDoubleValue(parameters, "pH", 7.0));
        details.setNitrogen(getDoubleValue(parameters, "Nitrogen", 0.0));
        details.setCationExchangeCapacity(getDoubleValue(parameters, "CationExchangeCapacity", 0.0));
        details.setHumidity(getDoubleValue(parameters, "Humidity", 50.0));
        details.setRainfall(getDoubleValue(parameters, "Rainfall", 0.0));
        details.setTemperature(getDoubleValue(parameters, "Temperature", 20.0));
        details.setOrganicCarbon(getDoubleValue(parameters, "OrganicCarbon", 0.0));

        // Sauvegarder les détails de la recommandation
        recommandationDetailsRepository.save(details);

        return savedRecommandation; // Retourner la recommandation créée
    }

   





    /**
     * Appeler le modèle Python pour générer les recommandations.
     */
    public RecommandationDTO generateRecommendation(Recommandation recommandation, Map<String, Double> parameters) {
        // Préparer les données d'entrée pour le modèle
        double[] inputData = {
            parameters.get("pH"),
            parameters.get("N"),
            parameters.get("CEC"),
            parameters.get("Humidity"),
            parameters.get("Rainfall"),
            parameters.get("Temperature"),
            parameters.get("OrganicCarbon")
        };

        // Appeler le modèle Python
        Map<String, Object> recommendations = pythonRecommendationService.getRecommendation(inputData);

        // Extraire les cultures recommandées
        List<List<Object>> top3 = (List<List<Object>>) recommendations.get("top_3");

        // Date et heure actuelles
        LocalDateTime now = LocalDateTime.now();

        // Remplir la table CultureRecommandation
        for (int i = 0; i < top3.size(); i++) {
            String cultureName = (String) top3.get(i).get(0); // Nom de la culture
            Double probability = (Double) top3.get(i).get(1); // Probabilité

            // Rechercher les cultures associées
            List<Culture> relatedCultures = cultureRepository.findByNomContaining(cultureName);
            if (relatedCultures.isEmpty()) {
                throw new IllegalArgumentException("No culture found for: " + cultureName);
            }

            // Ajouter une entrée pour chaque culture
            for (Culture culture : relatedCultures) {
                cultureRecommandationRepository.insert(
                    recommandation.getId(),
                    culture.getId(),
                    probability,
                    i + 1, // Ordre
                    now // Date actuelle
                );
            }
        }

        // Construire et retourner le DTO
        return getRecommandationWithDetails(recommandation.getId());
    }

    public RecommandationDTO getRecommandationWithDetails(Integer recommandationId) {
        Recommandation recommandation = recommandationRepository.findById(recommandationId)
                .orElseThrow(() -> new IllegalArgumentException("Recommandation non trouvée"));

        List<CultureRecommandation> cultureRecommandations = cultureRecommandationRepository.findByRecommandationId(recommandationId);

        List<CultureRecommandationDTO> cultureDTOs = cultureRecommandations.stream()
                .map(cr -> new CultureRecommandationDTO(
                        cr.getCulture().getNom(),
                        cr.getProbabilite(),
                        cr.getOrdre()
                ))
                .collect(Collectors.toList());

        return new RecommandationDTO(
                recommandation.getId(),
                recommandation.getDetails(),
                recommandation.getAgronomeId(),
                cultureDTOs
        );
    }

    public List<RecommandationDTO> getAllRecommandationsWithDetails() {
        List<Recommandation> recommandations = recommandationRepository.findAll();

        return recommandations.stream().map(recommandation -> {
            List<CultureRecommandation> cultureRecommandations = cultureRecommandationRepository.findByRecommandationId(recommandation.getId());

            List<CultureRecommandationDTO> cultureDTOs = cultureRecommandations.stream()
                    .map(cr -> new CultureRecommandationDTO(
                            cr.getCulture().getNom(),
                            cr.getProbabilite(),
                            cr.getOrdre()
                    ))
                    .collect(Collectors.toList());

            return new RecommandationDTO(
                    recommandation.getId(),
                    recommandation.getDetails(),
                    recommandation.getAgronomeId(),
                    cultureDTOs
            );
        }).collect(Collectors.toList());
    }
}
