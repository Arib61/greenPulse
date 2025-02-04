package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.DTO.CultureRecommandationDTO;
import greenpulse.ecocrops.ecocrops.DTO.RecommandationDTO;
import greenpulse.ecocrops.ecocrops.models.*;
import greenpulse.ecocrops.ecocrops.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecommandationService {

    private final PythonRecommendationService pythonRecommendationService;    // => pour les cultures
    private final PythonRecommendationService2 pythonRecommendationService2;  // => pour les paramètres du sol

    private final RecommandationRepository recommandationRepository;
    private final CultureRepository cultureRepository;
    private final CultureRecommandationRepository cultureRecommandationRepository;
    private final RecommandationDetailsRepository recommandationDetailsRepository;
    private final SoleRepository soleRepository;

    /**
     * 1) Méthode publique appelée par l’endpoint /api/recommendations/sole/{soleId}
     *    - Vérifie si la recommandation existe déjà pour cette sole.
     *    - Sinon, crée la Recommandation + RecommandationDetails.
     *    - Appelle Python pour générer la liste des cultures, puis insère en base.
     *    - Retourne le RecommandationDTO final.
     */
    @Transactional
    public RecommandationDTO createRecommendationForSole(Integer soleId) {
        // Récupérer la sole
        Sole sole = soleRepository.findById(soleId)
                .orElseThrow(() -> new IllegalArgumentException("Sole introuvable avec l'ID " + soleId));

        // Vérifier si la sole a déjà un RecommandationDetails
        Optional<RecommandationDetails> existingDetails = recommandationDetailsRepository.findBySoleId(soleId);
        if (existingDetails.isPresent()) {
            // Déjà une recommandation existante : on retourne directement le DTO
            System.out.println("✅ La sole ID " + soleId + " a déjà une recommandation existante.");
            Recommandation existingRec = existingDetails.get().getRecommandation();
            return getRecommandationWithDetails(existingRec.getId());
        }

        // Sinon, on crée une nouvelle recommandation pour cette sole
        // Étape A) Récupérer les paramètres du sol via pythonRecommendationService2
        Map<String, Double> parameters = pythonRecommendationService2.getParameters(
            sole.getLatitude(),
            sole.getLongitude()
        );

        // Étape B) Créer et sauvegarder la Recommandation et ses détails
        Recommandation recommandation = new Recommandation();
        recommandation.setDetails("Recommandation générée pour la Sole ID " + sole.getId());

        // Selon votre modèle, c’est soit setAgronomeId(...) soit setAgriculteurId(...)
        // Ajustez en fonction de la relation Sole -> Agriculteur ou Agronome
        // Par exemple :
        
        if (sole.getAgriculteur() != null) {
            recommandation.setAgriculteurId(sole.getAgriculteur().getId());
        }
        recommandation = recommandationRepository.save(recommandation);

        // Créer RecommandationDetails
        RecommandationDetails details = new RecommandationDetails();
        details.setRecommandation(recommandation);
        details.setSole(sole);

        // Récupérer chaque paramètre avec une valeur par défaut en cas d’absence
        details.setPH(getDoubleValue(parameters, "pH", 7.0));
        details.setNitrogen(getDoubleValue(parameters, "N", 0.0));
        details.setCationExchangeCapacity(getDoubleValue(parameters, "CEC", 0.0));
        details.setHumidity(getDoubleValue(parameters, "Humidity", 50.0));
        details.setRainfall(getDoubleValue(parameters, "Rainfall", 0.0));
        details.setTemperature(getDoubleValue(parameters, "Temperature", 20.0));
        details.setOrganicCarbon(getDoubleValue(parameters, "OrganicCarbon", 0.0));

        recommandationDetailsRepository.save(details);
        System.out.println("✅ Nouvelle recommandation créée pour la Sole ID " + soleId);

        // Étape C) Appeler le second service PythonRecommendationService pour avoir la liste (ou top_n) de cultures
        // Exemple : On construit le tableau dans l’ordre attendu par votre script Python
        double[] inputData = {
            details.getPH(),
            details.getNitrogen(),
            details.getCationExchangeCapacity(),
            details.getHumidity(),
            details.getRainfall(),
            details.getTemperature(),
            details.getOrganicCarbon()
        };

        Map<String, Object> recommendationOutput = pythonRecommendationService.getRecommendation(inputData);

        // On suppose que recommendation.py renvoie un JSON du style :
        // {
        //   "top_3": [
        //       ["Canne à sucre", 0.41],
        //       ["coton", 0.11],
        //       ["blé_printemps", 0.10]
        //   ]
        // }
        // => On récupère la clé "top_3"
        @SuppressWarnings("unchecked")
        List<List<Object>> top3 = (List<List<Object>>) recommendationOutput.get("top_3");
        if (top3 == null || top3.isEmpty()) {
            System.out.println("❌ Aucune culture recommandée renvoyée par le script Python.");
            // On peut retourner la recommandation vide (sans cultures)
            return getRecommandationWithDetails(recommandation.getId());
        }

        // Étape D) Alimenter la table culture_recommandation
        LocalDateTime now = LocalDateTime.now();
        for (int i = 0; i < top3.size(); i++) {
            List<Object> cultureData = top3.get(i);
            if (cultureData.size() < 2) {
                continue; // Donnée incomplète
            }
            String cultureName = cultureData.get(0).toString();
            Double probability = parseToDouble(cultureData.get(1));

            // Chercher la/les culture(s) dont le nom contient (ou égale) cultureName
            // => ou bien si vous avez un champ "nom" exact, utilisez findByNom(cultureName)
            List<Culture> relatedCultures = cultureRepository.findByNomContaining(cultureName);
            if (relatedCultures.isEmpty()) {
                System.out.println("❌ Aucune culture trouvée en base pour : " + cultureName);
                continue;
            }

            // Insérer chaque culture correspondante
            for (Culture culture : relatedCultures) {
                CultureRecommandation cr = new CultureRecommandation();
                cr.setRecommandation(recommandation);
                cr.setCulture(culture);
                cr.setProbabilite(probability != null ? probability : 0.0);
                cr.setOrdre(i + 1);
                cr.setDateAssociation(now);

                cultureRecommandationRepository.save(cr);
            }
        }

        // Étape E) Retourner la recommandation avec les détails de cultures
        return getRecommandationWithDetails(recommandation.getId());
    }

    /**
     * 2) Méthode utilitaire pour obtenir la RecommandationDTO d’une recommandation existante,
     *    incluant la liste de ses cultures.
     */
    public RecommandationDTO getRecommandationWithDetails(Integer recommandationId) {
        Recommandation recommandation = recommandationRepository.findById(recommandationId)
            .orElseThrow(() -> new IllegalArgumentException("Recommandation non trouvée : ID " + recommandationId));

        List<CultureRecommandation> cultureRecommandations =
            cultureRecommandationRepository.findByRecommandationId(recommandationId);

        List<CultureRecommandationDTO> cultureDTOs = cultureRecommandations.stream()
            .map(cr -> new CultureRecommandationDTO(
                cr.getCulture().getNom(),
                cr.getProbabilite(),
                cr.getOrdre()
            ))
            .collect(Collectors.toList());

        // Ici, attention : .getAgronomeId() ou .getAgriculteurId() selon votre table
        return new RecommandationDTO(
            recommandation.getId(),
            recommandation.getDetails(),
            recommandation.getAgriculteurId(),
            cultureDTOs
        );
    }

    /**
     * 3) Méthode pour lister toutes les recommandations
     */
    public List<RecommandationDTO> getAllRecommandationsWithDetails() {
        List<Recommandation> recommandations = recommandationRepository.findAll();

        return recommandations.stream().map(recommandation -> {
            List<CultureRecommandation> cultureRecommandations =
                cultureRecommandationRepository.findByRecommandationId(recommandation.getId());

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
                recommandation.getAgriculteurId(),
                cultureDTOs
            );
        }).collect(Collectors.toList());
    }

    // -------------------------------------------------------------------------
    // Méthodes utilitaires privées
    // -------------------------------------------------------------------------

    /**
     * Permet de récupérer une valeur Double depuis la map de paramètres, 
     * sinon renvoyer une valeur par défaut (par ex. 0.0).
     */
    private Double getDoubleValue(Map<String, Double> parameters, String key, double defaultValue) {
        if (parameters.containsKey(key)) {
            Object value = parameters.get(key);
            if (value instanceof Number) {
                return ((Number) value).doubleValue();
            }
        }
        return defaultValue;
    }

    /**
     * Convertit un Object en Double, si possible.
     */
    private Double parseToDouble(Object obj) {
        if (obj == null) {
            return null;
        }
        if (obj instanceof Number) {
            return ((Number) obj).doubleValue();
        }
        try {
            return Double.valueOf(obj.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public List<CultureRecommandationDTO> getCulturesByRecommendationId(Integer recommendationId) {
        // 1) Récupérer la liste de CultureRecommandation
        List<CultureRecommandation> cultureRecs =
                cultureRecommandationRepository.findByRecommandationId(recommendationId);

        // 2) Convertir en liste de DTO
        return cultureRecs.stream()
                .map(cr -> new CultureRecommandationDTO(
                        cr.getCulture().getNom(),
                        cr.getProbabilite(),
                        cr.getOrdre()
                ))
                .collect(Collectors.toList());
    }
}