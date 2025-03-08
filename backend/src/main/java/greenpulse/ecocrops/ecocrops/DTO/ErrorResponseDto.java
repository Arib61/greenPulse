package greenpulse.ecocrops.ecocrops.DTO;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Schema(
        name = "ErrorResponse",
        description = "Schema to hold Error Response information"
)
public class ErrorResponseDto {

    @Schema(
        description = "API Path",
        example = "/api/create"
    )
    private String apiPath;

    @Schema(
        description = "HTTP Status Code",
        example = "400"
    )   
    private HttpStatus errorCode;
    
    @Schema(
        description = "Error Message",
        example = "Agricole name cannot be empty"
    )
    private String errorMessage;

    @Schema(
        description = "Error Time",
        example = "2021-07-01T10:00:00"
    )
    private LocalDateTime errorTime;
    
}
