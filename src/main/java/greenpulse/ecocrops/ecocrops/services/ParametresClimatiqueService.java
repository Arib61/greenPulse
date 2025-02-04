package greenpulse.ecocrops.ecocrops.services;

import greenpulse.ecocrops.ecocrops.models.ParametresClimatique;
import greenpulse.ecocrops.ecocrops.models.Sole;
import greenpulse.ecocrops.ecocrops.repository.ParametresClimatiqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class ParametresClimatiqueService {

    @Autowired
    private ParametresClimatiqueRepository parametresClimatiqueRepository;

    public void saveParametersForSole(Sole sole) {
        try {
            // ✅ Corrige le chemin du script Python
            String pythonScriptPath = "src/main/java/greenpulse/ecocrops/ecocrops/python/get_parameters_climatic.py";

            // ✅ Configure et exécute le script
            ProcessBuilder pb = new ProcessBuilder("python", pythonScriptPath,
                    sole.getLatitude().toString(), sole.getLongitude().toString());

            pb.redirectErrorStream(true); // Capture stdout et stderr
            Process process = pb.start();

            // ✅ Capture la sortie du script Python
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println("Python Output: " + line); // 🔍 Log du script Python
                result.append(line);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Le script Python s'est terminé avec une erreur !");
            }

            if (result.toString().trim().isEmpty()) {
                throw new RuntimeException("Le script Python n'a renvoyé aucune donnée !");
            }

            System.out.println("JSON Response from Python: " + result);

            // ✅ Convertir la réponse JSON en Objet Java
            ObjectMapper objectMapper = new ObjectMapper();
            ClimaticDataResponse climaticData = objectMapper.readValue(result.toString(), ClimaticDataResponse.class);

            // ✅ Sauvegarde dans la base de données
            ParametresClimatique parametres = new ParametresClimatique();
            parametres.setSole(sole);
            parametres.setTemperature(climaticData.getTemperature());
            parametres.setHumidity(climaticData.getHumidity());
            parametres.setRainfall(climaticData.getRainfall());
            parametres.setRainProbability(climaticData.getRainProbability());

            parametresClimatiqueRepository.save(parametres);
            System.out.println("✅ Paramètres climatiques sauvegardés pour la sole ID : " + sole.getId());

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'exécution du script Python: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static class ClimaticDataResponse {
        private Double Temperature;
        private Double Humidity;
        private Double Rainfall;
        private Double RainProbability;

        public Double getTemperature() { return Temperature; }
        public Double getHumidity() { return Humidity; }
        public Double getRainfall() { return Rainfall; }
        public Double getRainProbability() { return RainProbability; }
    }
}
