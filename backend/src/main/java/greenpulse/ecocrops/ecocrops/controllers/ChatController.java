package greenpulse.ecocrops.ecocrops.controllers;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import jakarta.annotation.PreDestroy;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/chat")
@Validated
@Tag(name = "Chatbot AI", description = "API permettant de communiquer avec un chatbot alimenté par un modèle IA externe")
public class ChatController {

    private Process pythonProcess;
    private BufferedWriter pythonWriter;
    private BufferedReader pythonReader;
    private final ObjectMapper objectMapper = new ObjectMapper(); // Pour parser JSON

    public ChatController() {
        try {
            startPythonProcess();
        } catch (IOException e) {
            throw new RuntimeException("Impossible de démarrer le processus Python", e);
        }
    }

    private void startPythonProcess() throws IOException {
        String pythonScriptPath =  "src/main/java/greenpulse/ecocrops/ecocrops/python/chat.py"; 
        ProcessBuilder processBuilder = new ProcessBuilder("python", pythonScriptPath);
        processBuilder.redirectErrorStream(true);
        pythonProcess = processBuilder.start();

        pythonWriter = new BufferedWriter(new OutputStreamWriter(pythonProcess.getOutputStream()));
        pythonReader = new BufferedReader(new InputStreamReader(pythonProcess.getInputStream()));
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
                startPythonProcess();
            }

            // Envoyer la requête à Python
            pythonWriter.write(userInput + "\n");
            pythonWriter.flush();

            // Lire la réponse JSON
            String output = pythonReader.readLine();
            if (output != null) {
                // Convertir la réponse en JSON
                Map<String, String> jsonResponse = objectMapper.readValue(output, Map.class);
                
                // Vérifier si une erreur est retournée par Python
                if (jsonResponse.containsKey("error")) {
                    return ResponseEntity.status(500).body(jsonResponse);
                }

                return ResponseEntity.ok(jsonResponse);
            } else {
                response.put("error", "Aucune réponse du bot.");
            }
        } catch (IOException e) {
            response.put("error", "Erreur de communication avec le script Python : " + e.getMessage());
        }

        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Arrêter le processus Python",
        description = "Détruit le processus Python lors de l'arrêt de l'application."
    )
    @ApiResponse(responseCode = "200", description = "Processus Python arrêté avec succès")
    @PreDestroy
    public void cleanup() {
        if (pythonProcess != null) {
            pythonProcess.destroy();
        }
    }
}
