package greenpulse.ecocrops.ecocrops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import greenpulse.ecocrops.ecocrops.models.Sole;

public interface SoleRepository extends JpaRepository<Sole, Integer> {
    List<Sole> findByAgronomeId(Integer agronomeId);

}
