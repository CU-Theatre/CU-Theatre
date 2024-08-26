package cu.theater.backend.dto.course;

public record CourseDto(
        Long id,
        Long userId,
        String name,
        String description,
        String status,
        String startDate,
        String image
) {
}
