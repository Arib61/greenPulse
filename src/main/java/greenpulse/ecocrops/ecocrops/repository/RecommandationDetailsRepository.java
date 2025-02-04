package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.RecommandationDetails;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommandationDetailsRepository extends JpaRepository<RecommandationDetails, Integer> {
    Optional<RecommandationDetails> findBySoleId(Integer soleId);
}
