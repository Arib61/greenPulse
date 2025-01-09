package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.TypeUtilisateur;
import greenpulse.ecocrops.ecocrops.services.UtilisateurService;
import greenpulse.ecocrops.ecocrops.DTO.LoginRequestDTO;
import greenpulse.ecocrops.ecocrops.DTO.LoginResponseDTO;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final UtilisateurService utilisateurService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        try {
            // Valider les données d'entrée
            if (request.getEmail() == null || request.getMotDePasse() == null) {
                return ResponseEntity.badRequest().body("Email et mot de passe sont obligatoires.");
            }

            // Authentification avec le service
            LoginResponseDTO response = utilisateurService.login(request.getEmail(), request.getMotDePasse());

            // Vérifier le type d'utilisateur
            if (!response.getTypeUtilisateur().equals(TypeUtilisateur.agronome)) {
                return ResponseEntity.status(403).body("Seuls les agronomes sont autorisés à se connecter.");
            }

            // Retourner la réponse en cas de succès
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            // Gestion des erreurs d'entrée utilisateur (par exemple, utilisateur introuvable ou mot de passe incorrect)
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            // Gestion des erreurs inattendues
            return ResponseEntity.status(500).body("Une erreur interne s'est produite. Veuillez réessayer plus tard.");
        }
    }
}
