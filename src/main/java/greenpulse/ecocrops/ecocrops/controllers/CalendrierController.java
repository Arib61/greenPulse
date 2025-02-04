package greenpulse.ecocrops.ecocrops.controllers;

import greenpulse.ecocrops.ecocrops.models.Calendrier;
import greenpulse.ecocrops.ecocrops.services.CalendrierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/calendrier")
public class CalendrierController {

    private final CalendrierService calendrierService;

    public CalendrierController(CalendrierService calendrierService) {
        this.calendrierService = calendrierService;
    }

    @GetMapping
    public ResponseEntity<List<Calendrier>> getAllCalendriers() {
        return ResponseEntity.ok(calendrierService.getAllCalendriers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCalendrierById(@PathVariable Integer id) {
        Optional<Calendrier> calendrier = calendrierService.getCalendrierById(id);
    
        if (calendrier.isPresent()) {
            return ResponseEntity.ok(calendrier.get());  // ✅ Retourne un `ResponseEntity<Calendrier>`
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Calendrier non trouvé"));  // ✅ Retourne un `ResponseEntity<Map<String, String>>`
        }
    }
    

    @GetMapping("/culture/{cultureId}")
    public ResponseEntity<List<Calendrier>> getCalendriersByCulture(@PathVariable Integer cultureId) {
        return ResponseEntity.ok(calendrierService.getCalendrierByCultureId(cultureId));
    }

    @PostMapping
    public ResponseEntity<Calendrier> createCalendrier(@RequestBody Calendrier calendrier) {
        return ResponseEntity.ok(calendrierService.saveCalendrier(calendrier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCalendrier(@PathVariable Integer id, @RequestBody Calendrier calendrier) {
        Optional<Calendrier> existing = calendrierService.getCalendrierById(id);
        if (existing.isPresent()) {
            calendrier.setId(id);
            return ResponseEntity.ok(calendrierService.saveCalendrier(calendrier));
        }
        return ResponseEntity.status(404).body("Calendrier non trouvé");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCalendrier(@PathVariable Integer id) {
        calendrierService.deleteCalendrier(id);
        return ResponseEntity.ok("Calendrier supprimé avec succès");
    }
}
