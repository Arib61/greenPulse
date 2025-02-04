package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.ParametresClimatique;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParametresClimatiqueRepository extends JpaRepository<ParametresClimatique, Integer> {
    Optional<ParametresClimatique> findBySoleId(Integer soleId);
}
