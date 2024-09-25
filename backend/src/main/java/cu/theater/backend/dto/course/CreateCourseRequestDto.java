package cu.theater.backend.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CreateCourseRequestDto {

    private String name;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd' 'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime startDate;
    @JsonFormat(pattern = "yyyy-MM-dd' 'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime finishDate;
    private String image;
    private String icon;
    private BigDecimal price;

}
