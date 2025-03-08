package greenpulse.ecocrops.ecocrops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "EcoCrops API",
        version = "1.0",
        description = "Documentation de l'API EcoCrops pour la gestion des cultures et recommandations agricoles.",
        contact = @Contact(
            name = "EcoCrops",
            email = "suppot@ecocrops.com"
        )
    )
)
public class EcocropsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcocropsApplication.class, args);
    }
}
