package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.models.RecommandationDetails;
import greenpulse.ecocrops.ecocrops.models.Recommandation;
import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.repository.RecommandationDetailsRepository;
import lombok.AllArgsConstructor;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RecommandationDetailsService {

    private final RecommandationDetailsRepository recommandationDetailsRepository;

    public RecommandationDetails createRecommandationDetails(Recommandation recommandation, Sole sole, 
                                                             double pH, double nitrogen, double cec,
                                                             double humidity, double rainfall, double temperature, 
                                                             double organicCarbon) {
        RecommandationDetails details = new RecommandationDetails();
        details.setRecommandation(recommandation);
        details.setSole(sole);
        details.setPH(pH);
        details.setNitrogen(nitrogen);
        details.setCationExchangeCapacity(cec);
        details.setHumidity(humidity);
        details.setRainfall(rainfall);
        details.setTemperature(temperature);
        details.setOrganicCarbon(organicCarbon);

        return recommandationDetailsRepository.save(details);
    }

    public Optional<RecommandationDetails> getDetailsBySoleId(Integer soleId) {
        return recommandationDetailsRepository.findBySoleId(soleId);
    }
}
