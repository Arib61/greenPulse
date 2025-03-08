package greenpulse.ecocrops.ecocrops.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SoleRequestDTO {
    private double superficie;
    private String localisation;
    private Integer agriculteurId;
}
