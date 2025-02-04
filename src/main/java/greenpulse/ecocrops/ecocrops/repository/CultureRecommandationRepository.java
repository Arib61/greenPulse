package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.CultureRecommandation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CultureRecommandationRepository extends JpaRepository<CultureRecommandation, Integer> {
    List<CultureRecommandation> findByRecommandationId(Integer recommandationId);
}
