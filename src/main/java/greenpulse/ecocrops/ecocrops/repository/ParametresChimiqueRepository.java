package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.ParametresChimique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParametresChimiqueRepository extends JpaRepository<ParametresChimique, Integer> {

    
    Optional<ParametresChimique> findBySoleId(Integer soleId);
}
