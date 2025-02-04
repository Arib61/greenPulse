package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.ParametresClimatique;
import greenpulse.ecocrops.ecocrops.repository.ParametresClimatiqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/parametres-climatiques")
public class ParametresClimatiqueController {

    @Autowired
    private ParametresClimatiqueRepository parametresClimatiqueRepository;

    // 🔹 Récupérer tous les paramètres climatiques
    @GetMapping
    public List<ParametresClimatique> getAllParametres() {
        return parametresClimatiqueRepository.findAll();
    }

    // 🔹 Récupérer un paramètre climatique par son ID
    @GetMapping("/{id}")
    public Optional<ParametresClimatique> getParametresById(@PathVariable Integer id) {
        return parametresClimatiqueRepository.findById(id);
    }

    // 🔹 Récupérer les paramètres climatiques par Sole ID
    @GetMapping("/sole/{soleId}")
    public ResponseEntity<?> getParametresBySoleId(@PathVariable Integer soleId) {
        Optional<ParametresClimatique> parametres = parametresClimatiqueRepository.findBySoleId(soleId);

        if (parametres.isPresent()) {
            return ResponseEntity.ok(parametres.get());
        } else {
            return ResponseEntity.status(404).body(Map.of(
                "error", "Aucun paramètre climatique trouvé pour la sole ID " + soleId
            ));
        }
    }
}
