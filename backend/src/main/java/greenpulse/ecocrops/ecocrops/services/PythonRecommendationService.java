package greenpulse.ecocrops.ecocrops.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PythonRecommendationService {

    public Map<String, Object> getRecommendation(double[] inputData) {
        try {
            // Construire la commande pour exécuter le script Python
            String pythonScriptPath = "src\\main\\java\\greenpulse\\ecocrops\\ecocrops\\python\\recommendation.py";
            String pythonScriptPath_docker = "/app/src/main/java/greenpulse/ecocrops/ecocrops/python/recommendation.py"; 
            String pythonExecutable = "python"; // Utiliser "python" car c'est votre Python par défaut
            String[] command = new String[]{
                pythonExecutable, pythonScriptPath_docker,
                String.valueOf(inputData[0]),
                String.valueOf(inputData[1]),
                String.valueOf(inputData[2]),
                String.valueOf(inputData[3]),
                String.valueOf(inputData[4]),
                String.valueOf(inputData[5]),
                String.valueOf(inputData[6])
            };

            // Exécuter la commande
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.redirectErrorStream(true); // Rediriger stderr vers stdout pour capturer toutes les sorties
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
