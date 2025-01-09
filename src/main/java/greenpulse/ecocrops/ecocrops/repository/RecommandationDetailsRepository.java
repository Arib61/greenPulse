package greenpulse.ecocrops.ecocrops.repository;

import greenpulse.ecocrops.ecocrops.models.RecommandationDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommandationDetailsRepository extends JpaRepository<RecommandationDetails, Integer> {
    // Vous pouvez ajouter des méthodes de requête personnalisées ici si nécessaire
}
