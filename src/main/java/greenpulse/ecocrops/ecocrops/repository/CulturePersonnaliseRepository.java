package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.CulturePersonnalisee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CulturePersonnaliseRepository extends JpaRepository<CulturePersonnalisee, Integer> {
    List<CulturePersonnalisee> findByUtilisateurId(Integer utilisateurId);
    Optional<CulturePersonnalisee> findByIdAndUtilisateurId(Integer id, Integer utilisateurId);
}
