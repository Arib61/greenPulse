package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "culture")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // Stocke toutes les sous-classes dans la même table
@DiscriminatorColumn(name = "type_culture", discriminatorType = DiscriminatorType.STRING)
@Data
public class Culture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nom", nullable = false, length = 100)
    private String nom;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "besoin_eau", length = 100)
    private String besoinEau;

    @Column(name = "rendement_annuel", length = 100)
    private String rendementAnnuel;

    @Column(name = "cout")
    private String cout;

    @Column(name = "temps", length = 100)
    private String temps;
}
