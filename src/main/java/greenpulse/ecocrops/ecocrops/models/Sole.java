package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Sole")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private double superficie;

    @Column(nullable = true)
    private String localisation;

    @Column(nullable = true)
    private Double latitude;

    @Column(nullable = true)
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "agronome_id", nullable = true)
    private Utilisateur agronome;
}
