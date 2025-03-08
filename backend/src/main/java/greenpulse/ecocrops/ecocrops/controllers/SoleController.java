package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.services.SoleService;
import greenpulse.ecocrops.ecocrops.DTO.SoleRequestDTO;
import greenpulse.ecocrops.ecocrops.exception.RessourceNotFoundException;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/soles")
@AllArgsConstructor
@Tag(name = "Gestion des Soles", description = "API pour la gestion des soles agricoles")
public class SoleController {

    private final SoleService soleService;

    @Operation(summary = "Créer une sole", description = "Ajoute une nouvelle sole pour un agriculteur.")
    @ApiResponse(responseCode = "200", description = "Sole créée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé (réservé aux agriculteurs)")
    @ApiResponse(responseCode = "400", description = "Requête invalide")
    @PostMapping
    @PreAuthorize("hasAuthority('agriculteur')")
    public ResponseEntity<Sole> createSole(@RequestBody SoleRequestDTO request) {
        Sole sole = soleService.createSole(request.getSuperficie(), request.getLocalisation(), request.getAgriculteurId());
        return ResponseEntity.ok(sole);
    }

    @Operation(summary = "Récupérer une sole par ID", description = "Retourne les détails d'une sole spécifique.")
    @ApiResponse(responseCode = "200", description = "Sole récupérée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé")
    @ApiResponse(responseCode = "404", description = "Sole non trouvée")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('agriculteur')")
    public ResponseEntity<Sole> getSoleById(@PathVariable Integer id) {
        Sole sole = soleService.getSoleById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Sole", "ID", id.toString()));
        return ResponseEntity.ok(sole);
    }

    @Operation(summary = "Récupérer toutes les soles", description = "Retourne la liste de toutes les soles disponibles.")
    @ApiResponse(responseCode = "200", description = "Liste des soles récupérée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé")
    @ApiResponse(responseCode = "404", description = "Aucune sole trouvée")
    @GetMapping
    @PreAuthorize("hasAuthority('agriculteur')")
    public ResponseEntity<List<Sole>> getAllSoles() {
        List<Sole> soles = soleService.getAllSoles();
        if (soles.isEmpty()) {
            throw new RessourceNotFoundException("Sole", "Liste", "Aucune sole trouvée");
        }
        return ResponseEntity.ok(soles);
    }

    @Operation(summary = "Mettre à jour une sole", description = "Modifie les informations d'une sole existante.")
    @ApiResponse(responseCode = "200", description = "Sole mise à jour avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé")
    @ApiResponse(responseCode = "404", description = "Sole non trouvée")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('agriculteur')")
    public ResponseEntity<Sole> updateSole(@PathVariable Integer id, @RequestBody SoleRequestDTO request) {
        Sole updatedSole = soleService.updateSole(id, request.getSuperficie(), request.getLocalisation());
        if (updatedSole == null) {
            throw new RessourceNotFoundException("Sole", "ID", id.toString());
        }
        return ResponseEntity.ok(updatedSole);
    }

    @Operation(summary = "Supprimer une sole", description = "Supprime une sole de la base de données.")
    @ApiResponse(responseCode = "204", description = "Sole supprimée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé")
    @ApiResponse(responseCode = "404", description = "Sole non trouvée")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('agriculteur')")
    public ResponseEntity<Void> deleteSole(@PathVariable Integer id) {
        boolean isDeleted = soleService.deleteSole(id);
        if (!isDeleted) {
            throw new RessourceNotFoundException("Sole", "ID", id.toString());
        }
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Récupérer les soles d'un agriculteur", description = "Retourne la liste des soles appartenant à un agriculteur spécifique.")
    @ApiResponse(responseCode = "200", description = "Liste des soles récupérée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé")
    @ApiResponse(responseCode = "404", description = "Aucune sole trouvée pour cet agriculteur")
    @GetMapping("/user/{agriculteurId}")
    @PreAuthorize("hasAuthority('agriculteur')")
    public ResponseEntity<List<Sole>> getSolesByAgriculteur(@PathVariable Integer agriculteurId) {
        List<Sole> soles = soleService.getSolesByAgriculteurId(agriculteurId);
        if (soles.isEmpty()) {
            throw new RessourceNotFoundException("Sole", "Agriculteur ID", agriculteurId.toString());
        }
        return ResponseEntity.ok(soles);
    }
}
