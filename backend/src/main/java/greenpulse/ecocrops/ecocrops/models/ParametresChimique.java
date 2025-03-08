package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "parametres_chimique")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParametresChimique {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Relation avec Sole
    @ManyToOne
    @JoinColumn(name = "sole_id", nullable = false) // Clé étrangère vers sole
    private Sole sole;

    @Column(name = "pH", nullable = false)
    private Double pH; // pH du sol

    @Column(name = "nitrogen", nullable = false)
    private Double nitrogen; // Concentration en azote (N)

    @Column(name = "cation_exchange_capacity", nullable = false)
    private Double cationExchangeCapacity; // Capacité d'échange cationique (CEC)

    @Column(name = "organic_carbon", nullable = false)
    private Double organicCarbon; // Carbone organique
}
