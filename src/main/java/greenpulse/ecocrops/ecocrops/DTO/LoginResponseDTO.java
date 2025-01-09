package greenpulse.ecocrops.ecocrops.DTO;

import greenpulse.ecocrops.ecocrops.models.TypeUtilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private Integer id;
    private String email;
    private String prenom;
    private String nom;
    private TypeUtilisateur typeUtilisateur;
    private String token;
}
