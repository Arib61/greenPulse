package greenpulse.ecocrops.ecocrops.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Utilisateur2")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = true, length = 50)
    private String prenom;

    @Column(nullable = true, length = 50)
    private String nom;

    @Column(nullable = true, unique = true, length = 100)
    private String email;

    @Column(nullable = true)
    private String motDePasse;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeUtilisateur typeUtilisateur;
}
