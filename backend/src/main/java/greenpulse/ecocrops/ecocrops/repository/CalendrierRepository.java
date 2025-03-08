package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.Calendrier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendrierRepository extends JpaRepository<Calendrier, Integer> {
    List<Calendrier> findByCultureId(Integer cultureId);
}
