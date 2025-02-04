package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "culture_recommandation")
@Data
public class CultureRecommandation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "culture_id", nullable = false)
    private Culture culture;

    @ManyToOne
    @JoinColumn(name = "recommandation_id", nullable = false)
    private Recommandation recommandation;

    @Column(name = "probabilite", nullable = false)
    private Double probabilite;

    @Column(name = "ordre", nullable = false)
    private Integer ordre;

    @Column(name = "date_association", nullable = false)
    private LocalDateTime dateAssociation; // Ajout de la date et heure
}
