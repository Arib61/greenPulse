package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.ParametresChimique;
import greenpulse.ecocrops.ecocrops.repository.ParametresChimiqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/parametres-chimiques")
public class ParametresChimiqueController {

    @Autowired
    private ParametresChimiqueRepository parametresChimiqueRepository;

    // 🔹 Récupérer tous les paramètres chimiques
    @GetMapping
    public List<ParametresChimique> getAllParametres() {
        return parametresChimiqueRepository.findAll();
    }

    // 🔹 Récupérer un paramètre chimique par son ID
    @GetMapping("/{id}")
    public Optional<ParametresChimique> getParametresById(@PathVariable Integer id) {
        return parametresChimiqueRepository.findById(id);
    }

    // 🔹 Récupérer les paramètres chimiques par Sole ID
    @GetMapping("/sole/{soleId}")
    public ResponseEntity<?> getParametresBySoleId(@PathVariable Integer soleId) {
        Optional<ParametresChimique> parametres = parametresChimiqueRepository.findBySoleId(soleId);

        if (parametres.isPresent()) {
            return ResponseEntity.ok(parametres.get());
        } else {
            return ResponseEntity.status(404).body(Map.of(
                "error", "Aucun paramètre chimique trouvé pour la sole ID " + soleId
            ));
        }
    }
}
