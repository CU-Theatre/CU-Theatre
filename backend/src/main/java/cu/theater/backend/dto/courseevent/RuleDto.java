package cu.theater.backend.dto.courseevent;

import lombok.Data;

@Data
public class RuleDto {
    private String freq;
    private int interval;
    private String day;
}
