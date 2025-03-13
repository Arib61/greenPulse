package greenpulse.ecocrops.ecocrops.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import greenpulse.ecocrops.ecocrops.DTO.LoginResponseDTO;
import greenpulse.ecocrops.ecocrops.DTO.UtilisateurRequestDTO;
import greenpulse.ecocrops.ecocrops.config.JwtUtil;
import greenpulse.ecocrops.ecocrops.models.Agriculteur;
import greenpulse.ecocrops.ecocrops.models.IngenieurAgronome;
import greenpulse.ecocrops.ecocrops.models.TypeUtilisateur;
import greenpulse.ecocrops.ecocrops.models.Utilisateur;
import greenpulse.ecocrops.ecocrops.repository.AgriculteurRepository;
import greenpulse.ecocrops.ecocrops.repository.IngenieurAgronomeRepository;
import greenpulse.ecocrops.ecocrops.repository.UtilisateurRepository;


import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UtilisateurService {
    private final UtilisateurRepository utilisateurRepository;
    private final AgriculteurRepository agriculteurRepository;
    private final IngenieurAgronomeRepository ingenieurAgronomeRepository;
    private final PasswordEncoder passwordEncoder;

    // 🔹 Récupérer tous les utilisateurs
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // 🔹 Récupérer un utilisateur par ID
    public Optional<Utilisateur> getUtilisateurById(Integer id) {
        return utilisateurRepository.findById(id);
    }

    // 🔹 Créer un utilisateur
    public Utilisateur createUtilisateur(UtilisateurRequestDTO utilisateurDTO) {
        validateUtilisateur(utilisateurDTO);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setPrenom(utilisateurDTO.getPrenom());
        utilisateur.setNom(utilisateurDTO.getNom());
        utilisateur.setEmail(utilisateurDTO.getEmail());
        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateurDTO.getMotDePasse()));
        utilisateur.setTypeUtilisateur(utilisateurDTO.getTypeUtilisateur());

        return switch (utilisateur.getTypeUtilisateur()) {
            case agriculteur -> createAgriculteur(utilisateur);
            case ingenieur_agronome -> createIngenieurAgronome(utilisateur);
            default -> throw new IllegalArgumentException("Type d'utilisateur invalide");
        };
    }

    private Agriculteur createAgriculteur(Utilisateur utilisateur) {
        Agriculteur agriculteur = new Agriculteur();
        agriculteur.setPrenom(utilisateur.getPrenom());
        agriculteur.setNom(utilisateur.getNom());
        agriculteur.setEmail(utilisateur.getEmail());
        agriculteur.setMotDePasse(utilisateur.getMotDePasse());
        agriculteur.setTypeUtilisateur(TypeUtilisateur.agriculteur);
        return agriculteurRepository.save(agriculteur);
    }

    private IngenieurAgronome createIngenieurAgronome(Utilisateur utilisateur) {
        IngenieurAgronome ingenieurAgronome = new IngenieurAgronome();
        ingenieurAgronome.setPrenom(utilisateur.getPrenom());
        ingenieurAgronome.setNom(utilisateur.getNom());
        ingenieurAgronome.setEmail(utilisateur.getEmail());
        ingenieurAgronome.setMotDePasse(utilisateur.getMotDePasse());
        ingenieurAgronome.setTypeUtilisateur(TypeUtilisateur.ingenieur_agronome);
        return ingenieurAgronomeRepository.save(ingenieurAgronome);
    }

    // 🔹 Mettre à jour un utilisateur
    public Optional<Utilisateur> updateUtilisateur(Integer id, UtilisateurRequestDTO utilisateurDTO) {
        return utilisateurRepository.findById(id).map(utilisateur -> {
            utilisateur.setPrenom(utilisateurDTO.getPrenom());
            utilisateur.setNom(utilisateurDTO.getNom());
            utilisateur.setEmail(utilisateurDTO.getEmail());

            if (!utilisateurDTO.getMotDePasse().isEmpty()) {
                utilisateur.setMotDePasse(passwordEncoder.encode(utilisateurDTO.getMotDePasse()));
            }

            return utilisateurRepository.save(utilisateur);
        });
    }

    // 🔹 Supprimer un utilisateur
    public boolean deleteUtilisateur(Integer id) {
        return utilisateurRepository.findById(id).map(utilisateur -> {
            utilisateurRepository.delete(utilisateur);
            return true;
        }).orElse(false);
    }

    // 🔹 Valider les entrées utilisateur
    private void validateUtilisateur(UtilisateurRequestDTO utilisateur) {
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
        if (utilisateur.getTypeUtilisateur() == null) {
            throw new IllegalArgumentException("Le typeUtilisateur est obligatoire");
        }
    }

    public LoginResponseDTO login(String email, String motDePasse) {
    // Vérifier si l'utilisateur existe
    Utilisateur utilisateur = utilisateurRepository.findByEmail(email.trim().toLowerCase())
            .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect"));

    // Vérifier le mot de passe
    if (!passwordEncoder.matches(motDePasse, utilisateur.getMotDePasse())) {
        throw new IllegalArgumentException("Email ou mot de passe incorrect");
    }

    // Générer le token JWT
    String token = JwtUtil.generateToken(utilisateur.getEmail(), utilisateur.getTypeUtilisateur().toString());

    // Retourner les détails de connexion
        return new LoginResponseDTO(
                utilisateur.getId(),
                utilisateur.getEmail(),
                utilisateur.getPrenom(),
                utilisateur.getNom(),
                utilisateur.getTypeUtilisateur(),
                token
        );
    }

    public void updatePassword(Integer userId, String ancienMotDePasse, String nouveauMotDePasse) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Vérifier si l'ancien mot de passe est correct
        if (!passwordEncoder.matches(ancienMotDePasse, utilisateur.getMotDePasse())) {
            throw new RuntimeException("Ancien mot de passe incorrect");
        }

        // Hasher et mettre à jour le nouveau mot de passe
        utilisateur.setMotDePasse(passwordEncoder.encode(nouveauMotDePasse));
        utilisateurRepository.save(utilisateur);
    }

}
