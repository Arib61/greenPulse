package greenpulse.ecocrops.ecocrops.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import greenpulse.ecocrops.ecocrops.DTO.LoginResponseDTO;
import greenpulse.ecocrops.ecocrops.models.Administrateur;
import greenpulse.ecocrops.ecocrops.models.Agronome;
import greenpulse.ecocrops.ecocrops.models.TypeUtilisateur;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.repository.AdministrateurRepository;
import greenpulse.ecocrops.ecocrops.repository.AgronomeRepository;
import greenpulse.ecocrops.ecocrops.repository.UtilisateurRepository;
import greenpulse.ecocrops.ecocrops.config.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
@Service
public class UtilisateurService {
    private final UtilisateurRepository utilisateurRepository;
    private final AgronomeRepository agronomeRepository;
    private final AdministrateurRepository administrateurRepository;
    private final PasswordEncoder passwordEncoder;


    public List<Utilisateur> getAllUtilisateurs(){
        return utilisateurRepository.findAll();
    }
    
    public Utilisateur getUtilisateurById(Integer id){
        return utilisateurRepository.findById(id)
                    .orElseThrow( () -> new RuntimeException("Utilisateur Introuvable"));
    }

    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        validateUtilisateur(utilisateur);
        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        if (utilisateur.getTypeUtilisateur() == TypeUtilisateur.agronome) {
            Agronome agronome = new Agronome();
            agronome.setPrenom(utilisateur.getPrenom());
            agronome.setNom(utilisateur.getNom());
            agronome.setEmail(utilisateur.getEmail());
            agronome.setMotDePasse(utilisateur.getMotDePasse());
            agronome.setTypeUtilisateur(TypeUtilisateur.agronome);
            return agronomeRepository.save(agronome);
        } else if (utilisateur.getTypeUtilisateur() == TypeUtilisateur.admin) {
            Administrateur administrateur = new Administrateur();
            administrateur.setPrenom(utilisateur.getPrenom());
            administrateur.setNom(utilisateur.getNom());
            administrateur.setEmail(utilisateur.getEmail());
            administrateur.setMotDePasse(utilisateur.getMotDePasse());
            administrateur.setTypeUtilisateur(TypeUtilisateur.admin);
            return administrateurRepository.save(administrateur);
        }

        // En cas de type inconnu (normalement jamais atteint)
        throw new IllegalArgumentException("Type d'utilisateur invalide");
    }

    public Utilisateur updateUtilisateur(Integer id, Utilisateur utilisateur){
        validateUtilisateur(utilisateur);
        Utilisateur userDTO = getUtilisateurById(id);
        userDTO.setPrenom(utilisateur.getPrenom());
        userDTO.setNom(utilisateur.getNom());
        userDTO.setEmail(utilisateur.getEmail());
        userDTO.setMotDePasse(utilisateur.getMotDePasse());
        //userDTO.setTypeUtilisateur(utilisateur.getTypeUtilisateur());

        return utilisateurRepository.save(userDTO);
    }

    public boolean deleteUtilisateur(Integer id) {
        Utilisateur utilisateur = getUtilisateurById(id);
        if (utilisateur != null) {
            utilisateurRepository.delete(utilisateur);
            return true; // La suppression a réussi
        }
        return false; // L'utilisateur n'a pas été trouvé
    }
    

    private void validateUtilisateur(Utilisateur utilisateur) {
        if (!StringUtils.hasText(utilisateur.getPrenom())) {
            throw new IllegalArgumentException("Le prénom est obligatoire");
        }
        if (!StringUtils.hasText(utilisateur.getNom())) {
            throw new IllegalArgumentException("Le nom est obligatoire");
        }
        if (!StringUtils.hasText(utilisateur.getEmail())) {
            throw new IllegalArgumentException("L'email est obligatoire");
        }
        if (!StringUtils.hasText(utilisateur.getMotDePasse())) {
            throw new IllegalArgumentException("Le mot de passe est obligatoire");
        }
        // if (utilisateur.getTypeUtilisateur() == null) {
        //     throw new IllegalArgumentException("Le typeUtilisateur est obligatoire");
        // }
    }


    public LoginResponseDTO login(String email, String motDePasse) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect"));
    
        if (!passwordEncoder.matches(motDePasse, utilisateur.getMotDePasse())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }
    
        // Génération du token JWT
        String token = JwtUtil.generateToken(utilisateur.getEmail(), utilisateur.getTypeUtilisateur().toString());
    
        return new LoginResponseDTO(
            utilisateur.getId(),
            utilisateur.getEmail(),
            utilisateur.getPrenom(),
            utilisateur.getNom(),
            utilisateur.getTypeUtilisateur(),
            token
        );
    }
    
    
    



    

    
}
