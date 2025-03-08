package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.TypeUtilisateur;
import greenpulse.ecocrops.ecocrops.services.UtilisateurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import greenpulse.ecocrops.ecocrops.DTO.LoginRequestDTO;
import greenpulse.ecocrops.ecocrops.DTO.LoginResponseDTO;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@Validated
@Tag(name = "Authentification" , description = "Les opérations d'authentification des utilisateurs")
public class AuthController {

    private final UtilisateurService utilisateurService;

    @Operation(
            summary = "Authentification d'un agriculteur",
            description = "Authentification d'un agriculteur via son email et mot de passe."
    )
    @ApiResponse(responseCode = "200", description = "Authentification réussie et retourne les informations de l'utilisateur.")
    @ApiResponse(responseCode = "400", description = "Email et mot de passe sont obligatoires.")
    @ApiResponse(responseCode = "401", description = "Seuls les agriculteurs sont autorisés à se connecter.")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé.")
    @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        
        // Vérifier que les champs obligatoires sont remplis
        if (request.getEmail() == null || request.getMotDePasse() == null) {
            throw new IllegalArgumentException("Email et mot de passe sont obligatoires.");
        }

        // Authentifier l'utilisateur via le service
        LoginResponseDTO response = utilisateurService.login(request.getEmail(), request.getMotDePasse());

        // Vérifier le type d'utilisateur
        if (!response.getTypeUtilisateur().equals(TypeUtilisateur.agriculteur)) {
            throw new IllegalArgumentException("Seuls les agriculteurs sont autorisés à se connecter.");
        }

        return ResponseEntity.ok(response);
    }
}
