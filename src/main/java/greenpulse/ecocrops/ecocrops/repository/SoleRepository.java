package greenpulse.ecocrops.ecocrops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;

public interface SoleRepository extends JpaRepository<Sole, Integer> {
    List<Sole> findByAgriculteur(Utilisateur agriculteur);


}
