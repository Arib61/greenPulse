package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.DTO.CulturePersonnaliseRequest;
import greenpulse.ecocrops.ecocrops.models.Culture;
import greenpulse.ecocrops.ecocrops.models.CulturePersonnalisee;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.repository.CulturePersonnaliseRepository;
import greenpulse.ecocrops.ecocrops.repository.CultureRepository;
import greenpulse.ecocrops.ecocrops.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/culture-personnalise")
public class CulturePersonnaliseController {

    @Autowired
    private CulturePersonnaliseRepository culturePersonnaliseRepository;

    @Autowired
    private CultureRepository cultureRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostMapping("/{userId}")
    public ResponseEntity<?> ajouterCulturePersonnalisee(@PathVariable Integer userId, @RequestBody CulturePersonnaliseRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec l'ID : " + userId));

        Culture culture = cultureRepository.findById(request.getCultureId())
                .orElseThrow(() -> new RuntimeException("Culture introuvable avec l'ID : " + request.getCultureId()));

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

    @GetMapping("/{userId}")
    public ResponseEntity<List<CulturePersonnalisee>> getCulturesPersonnalisees(@PathVariable Integer userId) {
        return ResponseEntity.ok(culturePersonnaliseRepository.findByUtilisateurId(userId));
    }

    @GetMapping("/{userId}/{id}")
    public ResponseEntity<CulturePersonnalisee> getCulturePersonnalisee(@PathVariable Integer userId, @PathVariable Integer id) {
        CulturePersonnalisee culture = culturePersonnaliseRepository.findByIdAndUtilisateurId(id, userId)
                .orElseThrow(() -> new RuntimeException("Culture personnalisée non trouvée pour cet utilisateur"));
        return ResponseEntity.ok(culture);
    }

    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<?> supprimerCulturePersonnalisee(@PathVariable Integer userId, @PathVariable Integer id) {
        CulturePersonnalisee culture = culturePersonnaliseRepository.findByIdAndUtilisateurId(id, userId)
                .orElseThrow(() -> new RuntimeException("Culture personnalisée non trouvée pour cet utilisateur"));

        culturePersonnaliseRepository.delete(culture);
        return ResponseEntity.ok("Culture personnalisée supprimée avec succès !");
    }
}
