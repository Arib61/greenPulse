package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.services.UtilisateurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import greenpulse.ecocrops.ecocrops.exception.RessourceNotFoundException;
import greenpulse.ecocrops.ecocrops.DTO.UpdatePasswordRequest;
import greenpulse.ecocrops.ecocrops.DTO.UtilisateurRequestDTO;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/utilisateurs")
@Validated
@Tag(name = "Utilisateurs", description = "Les opérations sur les utilisateurs")
public class UtilisateurController {
    private final UtilisateurService utilisateurService;

    @Operation(
            summary = "Récupérer la liste des utilisateurs",
            description = "Récupérer la liste de tous les utilisateurs enregistrés dans la base de données."
    )
    @ApiResponse(responseCode = "200", description = "Liste des utilisateurs récupérée avec succès.")
    @ApiResponse(responseCode = "404", description = "Aucun utilisateur trouvé.")
    @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.")

    @GetMapping
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        if (utilisateurs.isEmpty()) {
            throw new RessourceNotFoundException("Utilisateur", "Liste", "Aucun utilisateur trouvé.");
        }
        return ResponseEntity.ok(utilisateurs);
    }

    @Operation(
            summary = "Récupérer un utilisateur par ID",
            description = "Récupérer un utilisateur enregistré dans la base de données via son ID."
    )
    @ApiResponse(responseCode = "200", description = "Utilisateur récupéré avec succès.")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé.")
    @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.")

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Integer id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Utilisateur", "ID", id.toString()));
        return ResponseEntity.ok(utilisateur);
    }

    @Operation(
            summary = "Créer un nouvel utilisateur",
            description = "Créer un nouvel utilisateur dans la base de données."
    )
    @ApiResponse(responseCode = "200", description = "Utilisateur créé avec succès.")
    @ApiResponse(responseCode = "400", description = "Les détails de l'utilisateur sont obligatoires.")
    @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.")

    @PostMapping
    public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody UtilisateurRequestDTO utilisateurDetails) {
        Utilisateur utilisateur = utilisateurService.createUtilisateur(utilisateurDetails);
        return ResponseEntity.ok(utilisateur);
    }

    @Operation(
            summary = "Mettre à jour un utilisateur",
            description = "Mettre à jour un utilisateur enregistré dans la base de données via son ID."
    )
    @ApiResponse(responseCode = "200", description = "Utilisateur mis à jour avec succès.")
    @ApiResponse(responseCode = "400", description = "Les détails de l'utilisateur sont obligatoires.")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé.")
    @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.")

    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(
            @PathVariable Integer id, @RequestBody UtilisateurRequestDTO utilisateurDetails) {
        Utilisateur updatedUtilisateur = utilisateurService.updateUtilisateur(id, utilisateurDetails)
                .orElseThrow(() -> new RessourceNotFoundException("Utilisateur", "ID", id.toString()));
        return ResponseEntity.ok(updatedUtilisateur);
    }

    @Operation(
            summary = "Supprimer un utilisateur",
            description = "Supprimer un utilisateur enregistré dans la base de données via son ID."
    )
    @ApiResponse(responseCode = "204", description = "Utilisateur supprimé avec succès.")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé.")
    @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.")
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Integer id) {
        boolean isDeleted = utilisateurService.deleteUtilisateur(id);
        if (!isDeleted) {
            throw new RessourceNotFoundException("Utilisateur", "ID", id.toString());
        }
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Mettre à jour le mot de passe d'un utilisateur",
            description = "Mettre à jour le mot de passe d'un utilisateur enregistré dans la base de données via son ID."
    )
    @ApiResponse(responseCode = "200", description = "Mot de passe mis à jour avec succès.")
    @ApiResponse(responseCode = "400", description = "Les champs obligatoires sont obligatoires.")
    @ApiResponse(responseCode = "404", description = "Utilisateur non rencontré.")
    @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.")
    @PutMapping("/{userId}/update-password")
    public ResponseEntity<String> updatePassword(
            @PathVariable Integer userId,
            @RequestBody UpdatePasswordRequest request,
            @RequestHeader("Authorization") String token) {

        utilisateurService.updatePassword(userId, request.getAncienMotDePasse(), request.getNouveauMotDePasse());
        return ResponseEntity.ok("Mot de passe mis à jour avec succès");
    }

}
