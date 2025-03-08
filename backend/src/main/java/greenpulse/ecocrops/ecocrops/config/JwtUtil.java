package greenpulse.ecocrops.ecocrops.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    private static final byte[] SECRET_KEY = Base64.getDecoder().decode("rsUmKtIPDr99FLI2lrD+zDGgF08y1YWAoBvqZ2H3f8M=");
 

    public static String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role) // Inclure le rôle dans les claims du token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Expiration : 1 heure
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY), SignatureAlgorithm.HS256)
                .compact();
    }
    


    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY)) // Utiliser la clé pour valider le token
                .build()
                .parseClaimsJws(token);
            return true; // Si aucune exception n'est levée, le token est valide
        } catch (Exception e) {
            System.err.println("Erreur de validation du token : " + e.getMessage());
            return false; // Le token est invalide ou expiré
        }
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY)) // Utiliser la clé pour extraire les claims
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    public String extractTypeUtilisateur(String token) {
        return extractClaims(token).get("typeUtilisateur", String.class);
    }

     // Extraire le rôle depuis le token
     public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class); // Récupérer le rôle
    }
}
