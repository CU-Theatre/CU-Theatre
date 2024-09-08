package cu.theater.backend.dto.roadmap;

public record CreateRoadMapDto(
        String title,
        Long courseId,
        String text
) {
}
