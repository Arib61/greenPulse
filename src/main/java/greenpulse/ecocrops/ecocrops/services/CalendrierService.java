package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.models.Calendrier;
import greenpulse.ecocrops.ecocrops.repository.CalendrierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendrierService {

    private final CalendrierRepository calendrierRepository;

    public CalendrierService(CalendrierRepository calendrierRepository) {
        this.calendrierRepository = calendrierRepository;
    }

    public List<Calendrier> getAllCalendriers() {
        return calendrierRepository.findAll();
    }

    public Optional<Calendrier> getCalendrierById(Integer id) {
        return calendrierRepository.findById(id);
    }

    public List<Calendrier> getCalendrierByCultureId(Integer cultureId) {
        return calendrierRepository.findByCultureId(cultureId);
    }

    public Calendrier saveCalendrier(Calendrier calendrier) {
        return calendrierRepository.save(calendrier);
    }

    public void deleteCalendrier(Integer id) {
        calendrierRepository.deleteById(id);
    }
}
