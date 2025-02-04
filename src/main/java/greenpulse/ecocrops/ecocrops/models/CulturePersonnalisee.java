package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "culture_personnalisee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CulturePersonnalisee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "culture_id", nullable = false)
    private Culture culture;  // 🔗 Lien vers la table Culture

    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;  // 👤 Lien vers l'utilisateur

    @Column(name = "date_plantation")
    private LocalDate datePlantation;

    @Column(name = "date_recolte")
    private LocalDate dateRecolte;

    @Column(name = "date_fertilisation")
    private LocalDate dateFertilisation;

    @Column(name = "personnalisation", length = 255)
    private String personnalisation;
}
