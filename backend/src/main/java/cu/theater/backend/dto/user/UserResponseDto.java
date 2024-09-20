package cu.theater.backend.dto.user;

import cu.theater.backend.model.Role;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Role.RoleName roleName;
    private boolean dramaCourseFinished;
    private List<Long> currentCourses;
}
