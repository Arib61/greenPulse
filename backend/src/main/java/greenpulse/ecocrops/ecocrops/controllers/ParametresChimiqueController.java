package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.ParametresChimique;
import greenpulse.ecocrops.ecocrops.repository.ParametresChimiqueRepository;
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
@RequestMapping("/api/parametres-chimiques")
@Tag(name = "Paramètres Chimiques", description = "Gestion des paramètres chimiques des sols")
@Validated
public class ParametresChimiqueController {

    @Autowired
    private ParametresChimiqueRepository parametresChimiqueRepository;

    @Operation(
        summary = "Récupérer tous les paramètres chimiques",
        description = "Retourne la liste complète des paramètres chimiques enregistrés."
    )
    @ApiResponse(responseCode = "200", description = "Liste des paramètres chimiques récupérée avec succès")
    @GetMapping
    public ResponseEntity<List<ParametresChimique>> getAllParametres() {
        return ResponseEntity.ok(parametresChimiqueRepository.findAll());
    }

    @Operation(
        summary = "Récupérer un paramètre chimique par ID",
        description = "Retourne un paramètre chimique spécifique en fonction de son identifiant unique."
    )
    @ApiResponse(responseCode = "200", description = "Paramètre chimique trouvé avec succès")
    @ApiResponse(responseCode = "404", description = "Paramètre chimique introuvable")
    @GetMapping("/{id}")
    public ResponseEntity<ParametresChimique> getParametresById(@PathVariable Integer id) {
        ParametresChimique parametres = parametresChimiqueRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Paramètre Chimique", "ID", id.toString()));
        return ResponseEntity.ok(parametres);
    }

    @Operation(
        summary = "Récupérer les paramètres chimiques par Sole ID",
        description = "Retourne les paramètres chimiques associés à une sole spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Paramètres chimiques trouvés avec succès")
    @ApiResponse(responseCode = "404", description = "Aucun paramètre chimique trouvé pour cette sole")
    @GetMapping("/sole/{soleId}")
    public ResponseEntity<ParametresChimique> getParametresBySoleId(@PathVariable Integer soleId) {
        ParametresChimique parametres = parametresChimiqueRepository.findBySoleId(soleId)
                .orElseThrow(() -> new RessourceNotFoundException("Paramètres Chimiques", "Sole ID", soleId.toString()));

        return ResponseEntity.ok(parametres);
    }
}
