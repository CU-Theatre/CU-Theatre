package cu.theater.backend.dto.courseevent;

import cu.theater.backend.model.Days;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class CourseEventCreateDto {
    private String title;
    private Date start;
    private Date end;
    private String description;
    private String icon;
    private Long courseId;
    private String freq;
    private Integer interval;
    private List<Days> days;
}
