package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recommandation_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommandationDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Relation avec Recommandation
    @ManyToOne
    @JoinColumn(name = "recommandation_id", nullable = false) // Clé étrangère vers recommandation
    private Recommandation recommandation;

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

    @Column(name = "humidity", nullable = false)
    private Double humidity; // Humidité

    @Column(name = "rainfall", nullable = false)
    private Double rainfall; // Précipitations

    @Column(name = "temperature", nullable = false)
    private Double temperature; // Température

    @Column(name = "organic_carbon", nullable = false)
    private Double organicCarbon; // Carbone organique
}
