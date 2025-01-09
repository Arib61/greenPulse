package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.DTO.RecommandationDTO;
import greenpulse.ecocrops.ecocrops.models.Recommandation;
import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.services.RecommandationService;
import greenpulse.ecocrops.ecocrops.services.SoleService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@AllArgsConstructor
public class RecommandationController {

    private final RecommandationService recommandationService;
    private final SoleService soleService;

    @PostMapping("/{agronomeId}")
    public ResponseEntity<?> createRecommendationsForAgronome(@PathVariable Integer agronomeId) {
        try {
            // Étape 1 : Récupérer les soles associées à l'agronome
            List<Sole> soles = soleService.getSolesByAgronomeId(agronomeId);

            if (soles.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of(
                    "error", "Aucune sole trouvée pour l'agronome ID " + agronomeId
                ));
            }

            List<RecommandationDTO> recommendations = new ArrayList<>();

            for (Sole sole : soles) {
                try {
                    // Vérification des coordonnées
                    if (sole.getLatitude() == null || sole.getLongitude() == null) {
                        System.err.println("Coordonnées manquantes pour la Sole ID : " + sole.getId());
                        continue;
                    }

                    // Étape 2 : Récupérer les paramètres
                    Map<String, Double> parameters = recommandationService.getParametersFromCoordinates(
                        sole.getLatitude(), sole.getLongitude()
                    );

                    if (parameters == null || parameters.isEmpty()) {
                        System.err.println("Paramètres introuvables pour la Sole ID : " + sole.getId());
                        continue;
                    }

                    // Étape 3 : Créer une recommandation pour cette sole
                    Recommandation recommandation = recommandationService.createRecommandationFromParameters(parameters, sole);

                    // Étape 4 : Générer le DTO
                    RecommandationDTO recommandationDTO = recommandationService.generateRecommendation(recommandation, parameters);
                    recommendations.add(recommandationDTO);

                } catch (Exception e) {
                    System.err.println("Erreur pour la Sole ID " + sole.getId() + " : " + e.getMessage());
                    e.printStackTrace();
                }
            }

            if (recommendations.isEmpty()) {
                return ResponseEntity.status(204).body(Map.of(
                    "message", "Aucune recommandation n'a pu être générée pour l'agronome ID " + agronomeId
                ));
            }

            return ResponseEntity.ok(recommendations);

        } catch (Exception e) {
            System.err.println("Erreur inattendue : " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur interne s'est produite.",
                "details", e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecommandationWithDetails(@PathVariable Integer id) {
        try {
            RecommandationDTO recommandationDTO = recommandationService.getRecommandationWithDetails(id);

            if (recommandationDTO == null) {
                return ResponseEntity.status(404).body(Map.of(
                    "error", "Recommandation introuvable pour l'ID " + id
                ));
            }

            return ResponseEntity.ok(recommandationDTO);

        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération de la recommandation : " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur interne s'est produite.",
                "details", e.getMessage()
            ));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllRecommandations() {
        try {
            List<RecommandationDTO> recommandations = recommandationService.getAllRecommandationsWithDetails();

            if (recommandations.isEmpty()) {
                return ResponseEntity.status(204).body(Map.of(
                    "message", "Aucune recommandation trouvée."
                ));
            }

            return ResponseEntity.ok(recommandations);

        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération des recommandations : " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur interne s'est produite.",
                "details", e.getMessage()
            ));
        }
    }
}
