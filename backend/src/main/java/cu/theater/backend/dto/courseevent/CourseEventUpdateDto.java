package cu.theater.backend.dto.courseevent;

import java.util.Date;
import lombok.Data;

@Data
public class CourseEventUpdateDto {
    private String title;
    private Date start;
    private Date end;
    private String description;
    private String icon;
    private RuleDto rule;
}
