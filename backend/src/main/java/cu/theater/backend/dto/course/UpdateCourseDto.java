package cu.theater.backend.dto.course;

import cu.theater.backend.model.Status;

public record UpdateCourseDto(
        String name,
        String description,
        String link,
        Status status
) {
}
