package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "culture")
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
    private Double cout;

    @Column(name = "temps", length = 100)
    private String temps;
}
