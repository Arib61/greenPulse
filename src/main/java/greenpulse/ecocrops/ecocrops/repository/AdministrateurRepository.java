package greenpulse.ecocrops.ecocrops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import greenpulse.ecocrops.ecocrops.models.Administrateur;

public interface AdministrateurRepository extends JpaRepository<Administrateur, Integer> {
}
