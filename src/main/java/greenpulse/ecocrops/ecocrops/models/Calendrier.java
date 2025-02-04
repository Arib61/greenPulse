package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "calendrier")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Calendrier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "culture_id", nullable = false)
    private Culture culture;  // Relation avec la table "cultures"

    @Column(name = "date_plantation")
    private LocalDate datePlantation;

    @ElementCollection
    @CollectionTable(name = "calendrier_dates_irrigation", joinColumns = @JoinColumn(name = "calendrier_id"))
    @Column(name = "dates_irrigation")
    private List<LocalDate> datesIrrigation;

    @ElementCollection
    @CollectionTable(name = "calendrier_methode_irrigation", joinColumns = @JoinColumn(name = "calendrier_id"))
    @Column(name = "methode_irrigation")
    private List<String> methodeIrrigation;

    @Column(name = "date_fertilisation")
    private LocalDate dateFertilisation;

    @Column(name = "date_traitement_phytosanitaire")
    private LocalDate dateTraitementPhytosanitaire;

    @Column(name = "date_recolte")
    private LocalDate dateRecolte;

    @Column(name = "consommation_eau_par_periode")
    private Float consommationEauParPeriode;

    @Column(name = "consommation_totale_eau")
    private Float consommationTotaleEau;

    @Column(name = "rendement_estime")
    private Float rendementEstime;

    @Column(name = "gain_financier_estime")
    private Float gainFinancierEstime;
}
