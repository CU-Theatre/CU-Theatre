package cu.theater.backend.dto.event;

import cu.theater.backend.model.Event;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class EventResponseDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String photoUrl;
    private Event.Status status;
}
