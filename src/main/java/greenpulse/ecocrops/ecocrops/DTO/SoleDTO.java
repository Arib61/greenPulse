package greenpulse.ecocrops.ecocrops.DTO;

import lombok.Data;

@Data
public class SoleDTO {
    private double superficie;
    private String localisation;
    private Double latitude;
    private Double longitude;
    private Integer agronomeId;
}
