package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.Calendrier;
import greenpulse.ecocrops.ecocrops.services.CalendrierService;
import greenpulse.ecocrops.ecocrops.exception.RessourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendrier")
@Tag(name = "Calendrier", description = "Gestion des calendriers de culture")
@Validated
public class CalendrierController {

    private final CalendrierService calendrierService;

    public CalendrierController(CalendrierService calendrierService) {
        this.calendrierService = calendrierService;
    }

    @Operation(
        summary = "Récupérer tous les calendriers",
        description = "Retourne une liste de tous les calendriers enregistrés."
    )
    @ApiResponse(responseCode = "200", description = "Liste des calendriers récupérée avec succès")
    @GetMapping
    public ResponseEntity<List<Calendrier>> getAllCalendriers() {
        return ResponseEntity.ok(calendrierService.getAllCalendriers());
    }

    @Operation(
        summary = "Récupérer un calendrier par ID",
        description = "Retourne les détails d'un calendrier spécifique en utilisant son ID."
    )
    @ApiResponse(responseCode = "200", description = "Calendrier trouvé et retourné avec succès")
    @ApiResponse(responseCode = "404", description = "Calendrier introuvable avec cet ID")
    @GetMapping("/{id}")
    public ResponseEntity<Calendrier> getCalendrierById(@PathVariable Integer id) {
        Calendrier calendrier = calendrierService.getCalendrierById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Calendrier", "id", id.toString()));
        return ResponseEntity.ok(calendrier);
    }

    @Operation(
        summary = "Récupérer les calendriers liés à une culture",
        description = "Retourne une liste de calendriers associés à une culture spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Liste des calendriers trouvée avec succès")
    @ApiResponse(responseCode = "404", description = "Aucun calendrier trouvé pour cette culture")
    @GetMapping("/culture/{cultureId}")
    public ResponseEntity<List<Calendrier>> getCalendriersByCulture(@PathVariable Integer cultureId) {
        return ResponseEntity.ok(calendrierService.getCalendrierByCultureId(cultureId));
    }

    @Operation(
        summary = "Créer un nouveau calendrier",
        description = "Ajoute un nouveau calendrier au système."
    )
    @ApiResponse(responseCode = "201", description = "Calendrier créé avec succès")
    @PostMapping
    public ResponseEntity<Calendrier> createCalendrier(@RequestBody Calendrier calendrier) {
        return ResponseEntity.ok(calendrierService.saveCalendrier(calendrier));
    }

    @Operation(
        summary = "Mettre à jour un calendrier",
        description = "Modifie un calendrier existant en fonction de son ID."
    )
    @ApiResponse(responseCode = "200", description = "Calendrier mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Calendrier introuvable")
    @PutMapping("/{id}")
    public ResponseEntity<Calendrier> updateCalendrier(@PathVariable Integer id, @RequestBody Calendrier calendrier) {
        // Vérifie si le calendrier existe avant de le mettre à jour
        calendrierService.getCalendrierById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Calendrier", "id", id.toString()));

        calendrier.setId(id);
        return ResponseEntity.ok(calendrierService.saveCalendrier(calendrier));
    }

    @Operation(
        summary = "Supprimer un calendrier",
        description = "Supprime un calendrier en fonction de son ID."
    )
    @ApiResponse(responseCode = "200", description = "Calendrier supprimé avec succès")
    @ApiResponse(responseCode = "404", description = "Calendrier introuvable")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCalendrier(@PathVariable Integer id) {
        // Vérifie si le calendrier existe avant de le supprimer
        calendrierService.getCalendrierById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Calendrier", "id", id.toString()));

        calendrierService.deleteCalendrier(id);
        return ResponseEntity.ok("Calendrier supprimé avec succès");
    }
}
