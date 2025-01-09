package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.repository.SoleRepository;
import greenpulse.ecocrops.ecocrops.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class SoleService {

    private final SoleRepository soleRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final GeolocationService geolocationService;

    // Créer une nouvelle sole
    public Sole createSole(double superficie, String localisation, Integer agronomeId) {
        // Vérifier que l'agronome existe
        Utilisateur agronome = utilisateurRepository.findById(agronomeId)
                .orElseThrow(() -> new RuntimeException("Agronome introuvable avec l'ID : " + agronomeId));

        if (!"agronome".equalsIgnoreCase(agronome.getTypeUtilisateur().name())) {
            throw new IllegalArgumentException("L'utilisateur avec l'ID : " + agronomeId + " n'est pas un agronome");
        }

        // Appeler le service pour récupérer les coordonnées
        Map<String, Double> latLong = geolocationService.getLatLongFromLocation(localisation);

        // Créer et sauvegarder la nouvelle sole
        Sole sole = new Sole();
        sole.setSuperficie(superficie);
        sole.setLocalisation(localisation);
        sole.setLatitude(latLong.get("latitude"));
        sole.setLongitude(latLong.get("longitude"));
        sole.setAgronome(agronome);

        return soleRepository.save(sole);
    }

    // Récupérer une sole par son ID
    public Sole getSoleById(Integer id) {
        return soleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sole introuvable avec l'ID : " + id));
    }

    // Récupérer toutes les soles
    public List<Sole> getAllSoles() {
        return soleRepository.findAll();
    }

    // Mettre à jour une sole existante
    public Sole updateSole(Integer id, double superficie, String localisation) {
        return soleRepository.findById(id).map(sole -> {
            sole.setSuperficie(superficie);
            sole.setLocalisation(localisation);

            // Mettre à jour les coordonnées en utilisant le GeolocationService
            Map<String, Double> latLong = geolocationService.getLatLongFromLocation(localisation);
            sole.setLatitude(latLong.get("latitude"));
            sole.setLongitude(latLong.get("longitude"));

            return soleRepository.save(sole);
        }).orElseThrow(() -> new RuntimeException("Sole introuvable avec l'ID : " + id));
    }

    // Supprimer une sole par son ID
    public boolean deleteSole(Integer id) {
        if (soleRepository.existsById(id)) {
            soleRepository.deleteById(id);
            return true;
        }
        throw new RuntimeException("Sole introuvable avec l'ID : " + id);
    }

    public List<Sole> getSolesByAgronomeId(Integer agronomeId) {
        return soleRepository.findByAgronomeId(agronomeId);
    }
}
