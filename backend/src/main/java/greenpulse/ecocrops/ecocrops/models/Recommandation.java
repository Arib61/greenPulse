package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recommandation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recommandation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // @Column(name = "type", length = 50)
    // private String type;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    // @Column(name = "time", updatable = false, insertable = false)
    // private java.sql.Timestamp time;

    @Column(name = "agriculteur_id")
    private Integer agriculteurId;


}
