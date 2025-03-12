package greenpulse.ecocrops.ecocrops.controllers;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import jakarta.annotation.PreDestroy;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/chat")
@Validated
@Tag(name = "Chatbot AI", description = "API permettant de communiquer avec un chatbot alimenté par un modèle IA externe")
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    private Process pythonProcess;
    private BufferedWriter pythonWriter;
    private BufferedReader pythonReader;
    private final ObjectMapper objectMapper = new ObjectMapper(); // Pour parser JSON

    public ChatController() {
        try {
            startPythonProcess();
        } catch (IOException e) {
            logger.error("Impossible de démarrer le processus Python", e);
            throw new RuntimeException("Impossible de démarrer le processus Python", e);
        }
    }

    private synchronized void startPythonProcess() throws IOException {
        logger.info("Démarrage du script Python...");

        String pythonScriptPath_local = "backend/src/main/java/greenpulse/ecocrops/ecocrops/python/chat.py";
        String pythonScriptPath_docker = "/app/chat_bot.py";
        ProcessBuilder processBuilder = new ProcessBuilder("python", pythonScriptPath_docker);
        processBuilder.redirectErrorStream(true);
        pythonProcess = processBuilder.start();

        pythonWriter = new BufferedWriter(new OutputStreamWriter(pythonProcess.getOutputStream()));
        pythonReader = new BufferedReader(new InputStreamReader(pythonProcess.getInputStream()));

        logger.info("Processus Python démarré avec succès.");
    }

    @Operation(
        summary = "Envoyer un message au chatbot",
        description = "Envoie un message au modèle IA et retourne la réponse générée."
    )
    @ApiResponse(responseCode = "200", description = "Réponse du chatbot retournée avec succès")
    @ApiResponse(responseCode = "400", description = "Requête invalide : le message ne peut pas être vide")
    @ApiResponse(responseCode = "500", description = "Erreur de communication avec le script Python")
    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> payload) {
        String userInput = payload.get("message");
        Map<String, String> response = new HashMap<>();

        if (userInput == null || userInput.isBlank()) {
            response.put("error", "Le message ne peut pas être vide.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Vérifier si le processus Python est actif, sinon le redémarrer
            if (pythonProcess == null || !pythonProcess.isAlive()) {
                logger.warn("Le processus Python est inactif, redémarrage...");
                startPythonProcess();
            }

            // Envoyer la requête à Python
            synchronized (this) {
                logger.info("Envoi du message à Python : {}", userInput);
                pythonWriter.write(userInput);
                pythonWriter.newLine();
                pythonWriter.flush();
            }

            // Lire la réponse JSON
            StringBuilder responseBuilder = new StringBuilder();
            String line;
            while ((line = pythonReader.readLine()) != null) {
                logger.debug("Python a répondu : {}", line);
                responseBuilder.append(line);
                if (line.endsWith("}")) {
                    break;
                }
            }

            String output = responseBuilder.toString();
            logger.info("Réponse complète de Python : {}", output);

            if (output.contains("error")) {
                response.put("error", "Erreur reçue de Python : " + output);
                return ResponseEntity.status(500).body(response);
            }

            logger.info("Réponse brute de Python : {}", output);

            // Convertir en JSON et renvoyer la réponse
            Map<String, String> jsonResponse = objectMapper.readValue(output, Map.class);
            return ResponseEntity.ok(jsonResponse);

        } catch (IOException e) {
            logger.error("Erreur de communication avec le script Python", e);
            response.put("error", "Erreur de communication avec le script Python : " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @Operation(
        summary = "Arrêter le processus Python",
        description = "Détruit le processus Python lors de l'arrêt de l'application."
    )
    @ApiResponse(responseCode = "200", description = "Processus Python arrêté avec succès")
    @PreDestroy
    public void cleanup() {
        if (pythonProcess != null) {
            logger.info("Arrêt du processus Python...");
            pythonProcess.destroy();
        }
    }
}
