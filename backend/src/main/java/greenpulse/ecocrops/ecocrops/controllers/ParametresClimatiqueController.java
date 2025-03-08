package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.ParametresClimatique;
import greenpulse.ecocrops.ecocrops.repository.ParametresClimatiqueRepository;
import greenpulse.ecocrops.ecocrops.exception.RessourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/parametres-climatiques")
@Validated
@Tag(name = "Paramètres Climatiques", description = "Gestion des paramètres climatiques des sols")
public class ParametresClimatiqueController {

    @Autowired
    private ParametresClimatiqueRepository parametresClimatiqueRepository;

    @Operation(
        summary = "Récupérer tous les paramètres climatiques",
        description = "Retourne la liste complète des paramètres climatiques enregistrés."
    )
    @ApiResponse(responseCode = "200", description = "Liste des paramètres climatiques récupérée avec succès")
    @GetMapping
    public ResponseEntity<List<ParametresClimatique>> getAllParametres() {
        return ResponseEntity.ok(parametresClimatiqueRepository.findAll());
    }

    @Operation(
        summary = "Récupérer un paramètre climatique par ID",
        description = "Retourne un paramètre climatique spécifique en fonction de son identifiant unique."
    )
    @ApiResponse(responseCode = "200", description = "Paramètre climatique trouvé avec succès")
    @ApiResponse(responseCode = "404", description = "Paramètre climatique introuvable")
    @GetMapping("/{id}")
    public ResponseEntity<ParametresClimatique> getParametresById(@PathVariable Integer id) {
        ParametresClimatique parametres = parametresClimatiqueRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Paramètre Climatique", "ID", id.toString()));
        return ResponseEntity.ok(parametres);
    }

    @Operation(
        summary = "Récupérer les paramètres climatiques par Sole ID",
        description = "Retourne les paramètres climatiques associés à une sole spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Paramètres climatiques trouvés avec succès")
    @ApiResponse(responseCode = "404", description = "Aucun paramètre climatique trouvé pour cette sole")
    @GetMapping("/sole/{soleId}")
    public ResponseEntity<ParametresClimatique> getParametresBySoleId(@PathVariable Integer soleId) {
        ParametresClimatique parametres = parametresClimatiqueRepository.findBySoleId(soleId)
                .orElseThrow(() -> new RessourceNotFoundException("Paramètres Climatiques", "Sole ID", soleId.toString()));

        return ResponseEntity.ok(parametres);
    }
}
