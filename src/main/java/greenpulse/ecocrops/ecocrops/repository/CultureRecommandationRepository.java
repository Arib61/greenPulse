package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.CultureRecommandation;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CultureRecommandationRepository extends JpaRepository<CultureRecommandation, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO culture_recommandation (recommandation_id, culture_id, probabilite, ordre, date_association) " +
                   "VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
    void insert(Integer recommandationId, Integer cultureId, Double probabilite, Integer ordre, LocalDateTime dateAssociation);

    List<CultureRecommandation> findByRecommandationId(Integer recommandationId);
}
