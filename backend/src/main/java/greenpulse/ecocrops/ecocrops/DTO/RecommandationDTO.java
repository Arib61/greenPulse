package greenpulse.ecocrops.ecocrops.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecommandationDTO {
    private Integer id;
    private String details;
    private Integer agriculteurId;
    private List<CultureRecommandationDTO> cultures;
}

