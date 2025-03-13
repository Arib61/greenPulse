package greenpulse.ecocrops.ecocrops.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {
    private String ancienMotDePasse;
    private String nouveauMotDePasse;
}
