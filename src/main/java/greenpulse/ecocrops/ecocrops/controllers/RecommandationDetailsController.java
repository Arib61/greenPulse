package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.RecommandationDetails;
import greenpulse.ecocrops.ecocrops.services.RecommandationDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/recommendation_detail")
@AllArgsConstructor
public class RecommandationDetailsController {

    private final RecommandationDetailsService recommandationDetailsService;

    @GetMapping("/{soleId}")
    @PreAuthorize("hasAuthority('agriculteur')")
    public ResponseEntity<?> getRecommendationDetail(@PathVariable Integer soleId) {
        try {
            Optional<RecommandationDetails> details = recommandationDetailsService.getDetailsBySoleId(soleId);

            if (details.isEmpty()) {
                return ResponseEntity.status(204).body(Map.of(
                    "message", "Aucun détail de recommandation trouvé pour la Sole ID " + soleId
                ));
            }

            return ResponseEntity.ok(details.get());

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la récupération des détails.",
                "details", e.getMessage()
            ));
        }
    }
}
