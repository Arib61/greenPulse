package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parametres_climatique")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParametresClimatique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "sole_id", nullable = false)
    private Sole sole;

    @Column(name = "temperature")
    private Double temperature;

    @Column(name = "humidity")
    private Double humidity;

    @Column(name = "rainfall")
    private Double rainfall;

    @Column(name = "rain_probability")
    private Double rainProbability;
}
