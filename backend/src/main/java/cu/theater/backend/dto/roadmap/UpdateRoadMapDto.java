package cu.theater.backend.dto.roadmap;

public record UpdateRoadMapDto(
        String title,

        Long courseId,
        String text
) {
}
