package cu.theater.backend.dto.course;

public record CreateCourseRequestDto(
        String name,
        String description,
        String link,
        String image
) {
}
