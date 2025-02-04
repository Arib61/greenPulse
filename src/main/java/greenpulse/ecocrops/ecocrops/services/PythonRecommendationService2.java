package greenpulse.ecocrops.ecocrops.services;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Map;

@Service
public class PythonRecommendationService2 {

    public Map<String, Double> getParameters(double latitude, double longitude) {
        try {
            // Chemin du script Python
            String pythonScriptPath = "src\\main\\java\\greenpulse\\ecocrops\\ecocrops\\python\\get_parameters.py";
            String pythonExecutable = "python"; // Python par défaut
            
            // Construire la commande
            String[] command = new String[]{
                pythonExecutable, pythonScriptPath,
                String.valueOf(latitude),
                String.valueOf(longitude)
            };

            // Exécuter la commande
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.redirectErrorStream(true); // Rediriger stderr vers stdout
            Process process = processBuilder.start();

            // Lire la sortie du script Python
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            int exitCode = process.waitFor();

            // Vérifier le code de sortie
            if (exitCode != 0) {
                throw new RuntimeException("Le script Python a échoué avec le code de sortie : " + exitCode);
            }

            // Traiter la sortie JSON renvoyée par le script Python
            String jsonOutput = output.toString().trim();
            if (jsonOutput.isEmpty()) {
                throw new RuntimeException("Le script Python n'a renvoyé aucun contenu.");
            }

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(jsonOutput, Map.class);

        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'exécution du script Python : " + e.getMessage(), e);
        }
    }
}
