package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.DTO.CultureRecommandationDTO;
import greenpulse.ecocrops.ecocrops.DTO.RecommandationDTO;
import greenpulse.ecocrops.ecocrops.services.RecommandationService;
import greenpulse.ecocrops.ecocrops.exception.RessourceNotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@AllArgsConstructor
@Validated
@Tag(name = "Recommandations", description = "Gestion des recommandations de cultures basées sur les conditions du sol")
public class RecommandationController {

    private final RecommandationService recommandationService;

    @Operation(
        summary = "Générer une recommandation pour une sole donnée",
        description = "Analyse les paramètres d'une sole pour recommander des cultures adaptées."
    )
    @ApiResponse(responseCode = "200", description = "Recommandation générée avec succès")
    @ApiResponse(responseCode = "404", description = "Sole introuvable")
    @ApiResponse(responseCode = "500", description = "Erreur interne lors de la génération de la recommandation")
    @PostMapping("/sole/{soleId}")
    public ResponseEntity<RecommandationDTO> createRecommendationForSole(@PathVariable Integer soleId) {
        RecommandationDTO dto = recommandationService.createRecommendationForSole(soleId);
        return ResponseEntity.ok(dto);
    }

    @Operation(
        summary = "Récupérer les recommandations pour un utilisateur",
        description = "Retourne toutes les recommandations disponibles pour un utilisateur donné."
    )
    @ApiResponse(responseCode = "200", description = "Liste des recommandations récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Aucune recommandation trouvée pour cet utilisateur")
    @GetMapping("/{userId}")
    public ResponseEntity<List<RecommandationDTO>> getRecommendationsByUser(@PathVariable Integer userId) {
        List<RecommandationDTO> recommandations = recommandationService.getAllRecommandationsWithDetails();
        if (recommandations.isEmpty()) {
            throw new RessourceNotFoundException("Recommandations", "Utilisateur ID", userId.toString());
        }
        return ResponseEntity.ok(recommandations);
    }

    @Operation(
        summary = "Récupérer les cultures recommandées pour une recommandation donnée",
        description = "Retourne les cultures associées à une recommandation spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Cultures recommandées récupérées avec succès")
    @ApiResponse(responseCode = "404", description = "Aucune culture trouvée pour cette recommandation")
    @GetMapping("/{recommendationId}/cultures")
    public ResponseEntity<List<CultureRecommandationDTO>> getCulturesByRecommendationId(@PathVariable Integer recommendationId) {
        List<CultureRecommandationDTO> cultures = recommandationService.getCulturesByRecommendationId(recommendationId);
        if (cultures.isEmpty()) {
            throw new RessourceNotFoundException("Cultures recommandées", "Recommandation ID", recommendationId.toString());
        }
        return ResponseEntity.ok(cultures);
    }
}
