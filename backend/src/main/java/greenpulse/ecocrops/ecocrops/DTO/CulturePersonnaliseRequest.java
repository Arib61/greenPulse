package greenpulse.ecocrops.ecocrops.DTO;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class CulturePersonnaliseRequest {
    private Integer cultureId;
    private LocalDate datePlantation;
    private LocalDate dateRecolte;
    private LocalDate dateFertilisation;
    private String personnalisation;
}
