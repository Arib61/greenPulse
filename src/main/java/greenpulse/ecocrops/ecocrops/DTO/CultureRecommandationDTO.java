package greenpulse.ecocrops.ecocrops.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CultureRecommandationDTO {
    private String nom;
    private double probabilite;
    private int ordre;
}
