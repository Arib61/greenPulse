package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.models.Culture;
import greenpulse.ecocrops.ecocrops.models.CulturePersonnalisee;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.repository.CulturePersonnaliseRepository;
import greenpulse.ecocrops.ecocrops.repository.CultureRepository;
import greenpulse.ecocrops.ecocrops.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CulturePersonnaliseService {

    @Autowired
    private CulturePersonnaliseRepository culturePersonnaliseRepository;

    @Autowired
    private CultureRepository cultureRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public CulturePersonnalisee ajouterCulture(Integer utilisateurId, Integer cultureId, CulturePersonnalisee culturePersonnalisee) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec l'ID : " + utilisateurId));

        Culture culture = cultureRepository.findById(cultureId)
                .orElseThrow(() -> new RuntimeException("Culture introuvable avec l'ID : " + cultureId));

        culturePersonnalisee.setUtilisateur(utilisateur);
        culturePersonnalisee.setCulture(culture);
        return culturePersonnaliseRepository.save(culturePersonnalisee);
    }

    public List<CulturePersonnalisee> getCulturesParUtilisateur(Integer utilisateurId) {
        return culturePersonnaliseRepository.findByUtilisateurId(utilisateurId);
    }

    public void supprimerCulture(Integer id) {
        culturePersonnaliseRepository.deleteById(id);
    }
}
