package cu.theater.backend.dto.user;

import cu.theater.backend.dto.emergencycontact.EmergencyContactDto;
import cu.theater.backend.model.Role;
import java.util.List;

public record CurrentUserResponseDto(
        Long id,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        Role.RoleName roleName,
        boolean dramaCourseFinished,
        List<Long> currentCourses,
        EmergencyContactDto emergencyContactDto
) {
}
