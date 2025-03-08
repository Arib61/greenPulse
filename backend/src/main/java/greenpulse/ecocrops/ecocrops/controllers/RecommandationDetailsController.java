package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.RecommandationDetails;
import greenpulse.ecocrops.ecocrops.services.RecommandationDetailsService;
import greenpulse.ecocrops.ecocrops.exception.RessourceNotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/recommendation_detail")
@AllArgsConstructor
@Validated
@Tag(name = "Détails des recommandations", description = "Gestion des détails des recommandations agricoles basées sur une sole")
public class RecommandationDetailsController {

    private final RecommandationDetailsService recommandationDetailsService;

    @Operation(
        summary = "Récupérer les détails d'une recommandation pour une sole",
        description = "Retourne les détails d'une recommandation associée à une sole spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Détails récupérés avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé (seuls les agriculteurs sont autorisés)")
    @ApiResponse(responseCode = "404", description = "Aucun détail de recommandation trouvé pour cette sole")
    @PreAuthorize("hasAuthority('agriculteur')")
    @GetMapping("/{soleId}")
    public ResponseEntity<RecommandationDetails> getRecommendationDetail(@PathVariable Integer soleId) {
        RecommandationDetails details = recommandationDetailsService.getDetailsBySoleId(soleId)
                .orElseThrow(() -> new RessourceNotFoundException("Détails de Recommandation", "Sole ID", soleId.toString()));

        return ResponseEntity.ok(details);
    }
}
