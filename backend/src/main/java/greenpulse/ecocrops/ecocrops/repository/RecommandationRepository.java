package greenpulse.ecocrops.ecocrops.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import greenpulse.ecocrops.ecocrops.models.Recommandation;


public interface RecommandationRepository extends JpaRepository<Recommandation, Integer> {
    //Optional<Recommandation> findBySole(Sole sole);
}
