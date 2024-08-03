package cu.theater.backend.dto.event;

import cu.theater.backend.model.Event;
import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class EventResponseDto implements Serializable {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String photoUrl;
    private Event.Status status;
}
