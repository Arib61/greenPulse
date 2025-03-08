package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.DTO.CulturePersonnaliseRequest;
import greenpulse.ecocrops.ecocrops.models.Culture;
import greenpulse.ecocrops.ecocrops.models.CulturePersonnalisee;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.repository.CulturePersonnaliseRepository;
import greenpulse.ecocrops.ecocrops.repository.CultureRepository;
import greenpulse.ecocrops.ecocrops.repository.UtilisateurRepository;
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
@RequestMapping("/api/culture-personnalise")
@Validated
@Tag(name = "Cultures Personnalisées", description = "Gestion des cultures personnalisées des utilisateurs")
public class CulturePersonnaliseController {

    @Autowired
    private CulturePersonnaliseRepository culturePersonnaliseRepository;

    @Autowired
    private CultureRepository cultureRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Operation(
        summary = "Ajouter une culture personnalisée",
        description = "Ajoute une culture personnalisée pour un utilisateur spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Culture personnalisée ajoutée avec succès")
    @ApiResponse(responseCode = "404", description = "Utilisateur ou culture introuvable")
    @PostMapping("/{userId}")
    public ResponseEntity<CulturePersonnalisee> ajouterCulturePersonnalisee(
            @PathVariable Integer userId, @RequestBody CulturePersonnaliseRequest request) {
        
        Utilisateur utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RessourceNotFoundException("Utilisateur", "ID", userId.toString()));

        Culture culture = cultureRepository.findById(request.getCultureId())
                .orElseThrow(() -> new RessourceNotFoundException("Culture", "ID", request.getCultureId().toString()));

        CulturePersonnalisee culturePersonnalise = new CulturePersonnalisee();
        culturePersonnalise.setCulture(culture);
        culturePersonnalise.setUtilisateur(utilisateur);
        culturePersonnalise.setDatePlantation(request.getDatePlantation());
        culturePersonnalise.setDateRecolte(request.getDateRecolte());
        culturePersonnalise.setDateFertilisation(request.getDateFertilisation());
        culturePersonnalise.setPersonnalisation(request.getPersonnalisation());

        CulturePersonnalisee saved = culturePersonnaliseRepository.save(culturePersonnalise);
        return ResponseEntity.ok(saved);
    }

    @Operation(
        summary = "Récupérer les cultures personnalisées d'un utilisateur",
        description = "Retourne toutes les cultures personnalisées associées à un utilisateur spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Liste des cultures personnalisées récupérée avec succès")
    @GetMapping("/{userId}")
    public ResponseEntity<List<CulturePersonnalisee>> getCulturesPersonnalisees(@PathVariable Integer userId) {
        return ResponseEntity.ok(culturePersonnaliseRepository.findByUtilisateurId(userId));
    }

    @Operation(
        summary = "Récupérer une culture personnalisée par ID",
        description = "Retourne une culture personnalisée spécifique d'un utilisateur."
    )
    @ApiResponse(responseCode = "200", description = "Culture personnalisée trouvée avec succès")
    @ApiResponse(responseCode = "404", description = "Culture personnalisée introuvable")
    @GetMapping("/{userId}/{id}")
    public ResponseEntity<CulturePersonnalisee> getCulturePersonnalisee(
            @PathVariable Integer userId, @PathVariable Integer id) {
        
        CulturePersonnalisee culture = culturePersonnaliseRepository.findByIdAndUtilisateurId(id, userId)
                .orElseThrow(() -> new RessourceNotFoundException(
                        "Culture personnalisée", "ID", id.toString() + " pour l'utilisateur " + userId));

        return ResponseEntity.ok(culture);
    }

    @Operation(
        summary = "Supprimer une culture personnalisée",
        description = "Supprime une culture personnalisée pour un utilisateur spécifique."
    )
    @ApiResponse(responseCode = "200", description = "Culture personnalisée supprimée avec succès")
    @ApiResponse(responseCode = "404", description = "Culture personnalisée introuvable")
    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<String> supprimerCulturePersonnalisee(
            @PathVariable Integer userId, @PathVariable Integer id) {
        
        CulturePersonnalisee culture = culturePersonnaliseRepository.findByIdAndUtilisateurId(id, userId)
                .orElseThrow(() -> new RessourceNotFoundException(
                        "Culture personnalisée", "ID", id.toString() + " pour l'utilisateur " + userId));

        culturePersonnaliseRepository.delete(culture);
        return ResponseEntity.ok("Culture personnalisée supprimée avec succès !");
    }
}
