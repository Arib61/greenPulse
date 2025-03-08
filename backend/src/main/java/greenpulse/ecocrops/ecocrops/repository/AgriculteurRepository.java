package greenpulse.ecocrops.ecocrops.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import greenpulse.ecocrops.ecocrops.models.Agriculteur;


public interface AgriculteurRepository extends JpaRepository<Agriculteur, Integer> {
}
