package greenpulse.ecocrops.ecocrops.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import greenpulse.ecocrops.ecocrops.models.Recommandation;
import greenpulse.ecocrops.ecocrops.models.Sole;

public interface RecommandationRepository extends JpaRepository<Recommandation, Integer> {
    //Optional<Recommandation> findBySole(Sole sole);
}
