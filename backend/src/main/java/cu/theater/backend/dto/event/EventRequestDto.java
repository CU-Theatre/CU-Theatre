package cu.theater.backend.dto.event;

import cu.theater.backend.model.Event;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.Length;

@Data
@Accessors(chain = true)
public class EventRequestDto implements Serializable {
    @NotBlank
    @Length(min = 4, max = 35)
    private String name;
    @NotBlank
    @Length(min = 8, max = 500)
    private String description;
    @NotNull
    private BigDecimal price;
    @NotBlank
    private String photoUrl;
    @NotNull
    private Event.Status status;
}
