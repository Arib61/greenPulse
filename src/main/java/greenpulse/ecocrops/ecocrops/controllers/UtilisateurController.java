package greenpulse.ecocrops.ecocrops.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.services.UtilisateurService;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@AllArgsConstructor
@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {
    private final UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<?> getAllUtilisateurs() {
        try {
            List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
            if (utilisateurs.isEmpty()) {
                return ResponseEntity.status(204).body(Map.of("message", "Aucun utilisateur trouvé."));
            }
            return ResponseEntity.ok(utilisateurs);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la récupération des utilisateurs.",
                "details", e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUtilisateurById(@PathVariable Integer id) {
        try {
            Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
            if (utilisateur == null) {
                return ResponseEntity.status(404).body(Map.of(
                    "error", "Utilisateur introuvable pour l'ID " + id
                ));
            }
            return ResponseEntity.ok(utilisateur);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la récupération de l'utilisateur.",
                "details", e.getMessage()
            ));
        }
    }

    @PostMapping
    public ResponseEntity<?> createUtilisateur(@RequestBody Utilisateur utilisateurDetails) {
        try {
            if (utilisateurDetails == null || utilisateurDetails.getEmail() == null || utilisateurDetails.getNom() == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Les champs 'email' et 'nom' sont obligatoires."
                ));
            }
            Utilisateur utilisateur = utilisateurService.createUtilisateur(utilisateurDetails);
            return ResponseEntity.ok(utilisateur);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la création de l'utilisateur.",
                "details", e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUtilisateur(@PathVariable Integer id, @RequestBody Utilisateur utilisateurDetails) {
        try {
            if (utilisateurDetails == null || utilisateurDetails.getEmail() == null || utilisateurDetails.getNom() == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Les champs 'email' et 'nom' sont obligatoires."
                ));
            }
            Utilisateur updatedUtilisateur = utilisateurService.updateUtilisateur(id, utilisateurDetails);
            if (updatedUtilisateur == null) {
                return ResponseEntity.status(404).body(Map.of(
                    "error", "Utilisateur introuvable pour l'ID " + id
                ));
            }
            return ResponseEntity.ok(updatedUtilisateur);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
                "details", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUtilisateur(@PathVariable Integer id) {
        try {
            boolean isDeleted = utilisateurService.deleteUtilisateur(id);
            if (!isDeleted) {
                return ResponseEntity.status(404).body(Map.of(
                    "error", "Utilisateur introuvable pour l'ID " + id
                ));
            }
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la suppression de l'utilisateur.",
                "details", e.getMessage()
            ));
        }
    }
}

