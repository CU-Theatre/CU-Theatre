package cu.theater.backend.dto.courseevent;

import java.util.Date;
import lombok.Data;

@Data
public class CourseEventResponseDto {
    private Long id;
    private String title;
    private Date start;
    private Date end;
    private String description;
    private String icon;
    private Long courseId;
    private RuleDto rule;
}
