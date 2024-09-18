package cu.theater.backend.dto.course;

import cu.theater.backend.model.Status;
import java.math.BigDecimal;

public record UpdateCourseDto(
        String name,
        String description,
        String image,
        String icon,
        BigDecimal price,
        Status status
) {
}
