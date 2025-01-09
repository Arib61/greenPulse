package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.services.SoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/soles")
@AllArgsConstructor
public class SoleController {

    private final SoleService soleService;

    @PostMapping
    @PreAuthorize("hasAuthority('agronome')")
    public ResponseEntity<?> createSole(@RequestBody Map<String, Object> requestBody) {
        try {
            // Valider les données d'entrée
            if (!requestBody.containsKey("superficie") || !requestBody.containsKey("localisation") || !requestBody.containsKey("agronomeId")) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Les champs 'superficie', 'localisation' et 'agronomeId' sont obligatoires."
                ));
            }

            // Extraire les paramètres
            double superficie = Double.parseDouble(requestBody.get("superficie").toString());
            String localisation = requestBody.get("localisation").toString();
            Integer agronomeId = Integer.parseInt(requestBody.get("agronomeId").toString());

            // Appeler le service pour créer la sole
            Sole sole = soleService.createSole(superficie, localisation, agronomeId);
            return ResponseEntity.ok(sole);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la création de la sole.",
                "details", e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('agronome')")
    public ResponseEntity<?> getSoleById(@PathVariable Integer id) {
        try {
            Sole sole = soleService.getSoleById(id);
            if (sole != null) {
                return ResponseEntity.ok(sole);
            }
            return ResponseEntity.status(404).body(Map.of(
                "error", "Sole introuvable pour l'ID " + id
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la récupération de la sole.",
                "details", e.getMessage()
            ));
        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('agronome')")
    public ResponseEntity<?> getAllSoles() {
        try {
            List<Sole> soles = soleService.getAllSoles();
            if (soles.isEmpty()) {
                return ResponseEntity.status(204).body(Map.of(
                    "message", "Aucune sole trouvée."
                ));
            }
            return ResponseEntity.ok(soles);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la récupération des soles.",
                "details", e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('agronome')")
    public ResponseEntity<?> updateSole(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> requestBody) {
        try {
            // Valider les données d'entrée
            if (!requestBody.containsKey("superficie") || !requestBody.containsKey("localisation")) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Les champs 'superficie' et 'localisation' sont obligatoires."
                ));
            }

            // Extraire les paramètres
            double superficie = Double.parseDouble(requestBody.get("superficie").toString());
            String localisation = requestBody.get("localisation").toString();

            // Appeler le service pour mettre à jour la sole
            Sole updatedSole = soleService.updateSole(id, superficie, localisation);
            if (updatedSole != null) {
                return ResponseEntity.ok(updatedSole);
            }
            return ResponseEntity.status(404).body(Map.of(
                "error", "Sole introuvable pour l'ID " + id
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la mise à jour de la sole.",
                "details", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('agronome')")
    public ResponseEntity<?> deleteSole(@PathVariable Integer id) {
        try {
            boolean isDeleted = soleService.deleteSole(id);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(404).body(Map.of(
                "error", "Sole introuvable pour l'ID " + id
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Une erreur s'est produite lors de la suppression de la sole.",
                "details", e.getMessage()
            ));
        }
    }
}
