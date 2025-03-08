package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.Culture;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CultureRepository extends JpaRepository<Culture, Integer> {
    Optional<Culture> findByNom(String nom);

    List<Culture> findByNomContaining(String nom); // Trouver toutes les cultures contenant une sous-chaîne
}

