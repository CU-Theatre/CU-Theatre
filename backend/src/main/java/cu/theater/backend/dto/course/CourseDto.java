package cu.theater.backend.dto.course;

import cu.theater.backend.dto.roadmap.RoadMapDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import lombok.Data;

@Data
public class CourseDto {
    private Long id;
    private String name;
    private String description;
    private String status;
    private String startDate;
    private String finishDate;
    private BigDecimal price;
    private String image;
    private String icon;
    private Integer maxStudents;
    private List<RoadMapDto> roadMaps;
    private Set<Long> usersId;
}
