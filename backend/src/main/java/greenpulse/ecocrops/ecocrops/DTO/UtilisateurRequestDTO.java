package greenpulse.ecocrops.ecocrops.DTO;

import greenpulse.ecocrops.ecocrops.models.TypeUtilisateur;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UtilisateurRequestDTO {
    private String prenom;
    private String nom;
    private String email;
    private String motDePasse;
    private TypeUtilisateur typeUtilisateur;
}
