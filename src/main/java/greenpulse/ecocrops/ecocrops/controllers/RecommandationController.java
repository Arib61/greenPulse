package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.DTO.CultureRecommandationDTO;
import greenpulse.ecocrops.ecocrops.DTO.RecommandationDTO;
import greenpulse.ecocrops.ecocrops.services.RecommandationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@AllArgsConstructor
public class RecommandationController {

    private final RecommandationService recommandationService;

    /**
     * Générer une recommandation pour une sole donnée.
     * Désormais, createRecommendationForSole(...) renvoie directement un RecommandationDTO.
     */
    @PostMapping("/sole/{soleId}")
    public ResponseEntity<?> createRecommendationForSole(@PathVariable Integer soleId) {
        try {
            // Le service renvoie déjà un RecommandationDTO complet (avec cultures).
            RecommandationDTO dto = recommandationService.createRecommendationForSole(soleId);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Erreur lors de la génération des recommandations",
                    "details", e.getMessage()
            ));
        }
    }

    /**
     * Récupérer les recommandations de l'utilisateur (ou toutes si vous ne filtrez pas par user).
     * Ici, l’URL est /api/recommendations/{userId} mais vous ne filtrez pas encore en base.
     * Vous pouvez adapter si besoin.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<?> getRecommendationsByUser(@PathVariable Integer userId) {
        try {
            // Récupère toutes les recommandations + leurs cultures associées
            List<RecommandationDTO> recommandations = recommandationService.getAllRecommandationsWithDetails();
            if (recommandations.isEmpty()) {
                // Renvoie 204 si vide
                return ResponseEntity.status(204).body(Map.of(
                        "message", "Aucune recommandation trouvée"
                ));
            }
            // Sinon renvoie 200 OK + la liste
            return ResponseEntity.ok(recommandations);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Erreur lors de la récupération des recommandations",
                    "details", e.getMessage()
            ));
        }
    }

    /**
     * Récupérer les cultures recommandées basées sur l'ID de la recommandation.
     */
    @GetMapping("/{recommendationId}/cultures")
    public ResponseEntity<?> getCulturesByRecommendationId(@PathVariable Integer recommendationId) {
        try {
            // Supposez que vous avez une méthode getCulturesByRecommendationId dans votre service
            List<CultureRecommandationDTO> cultures = recommandationService.getCulturesByRecommendationId(recommendationId);
            if (cultures.isEmpty()) {
                return ResponseEntity.status(204).body(Map.of(
                        "message", "Aucune culture trouvée pour cette recommandation"
                ));
            }
            return ResponseEntity.ok(cultures);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Erreur lors de la récupération des cultures",
                    "details", e.getMessage()
            ));
        }
    }
}
