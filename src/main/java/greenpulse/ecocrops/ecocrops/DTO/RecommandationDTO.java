package greenpulse.ecocrops.ecocrops.DTO;

import greenpulse.ecocrops.ecocrops.models.Culture;
import greenpulse.ecocrops.ecocrops.models.CultureRecommandation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecommandationDTO {
    private Integer id;
    private String details;
    private Integer agronomeId;
    private List<CultureRecommandationDTO> cultures;
}

