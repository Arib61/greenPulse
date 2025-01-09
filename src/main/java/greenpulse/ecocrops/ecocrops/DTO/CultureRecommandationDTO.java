package greenpulse.ecocrops.ecocrops.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CultureRecommandationDTO {
    private String nom; // Nom de la culture
    private Double probabilite; // Probabilité associée à la culture
    private Integer ordre; // Ordre de la culture dans la recommandation
}
