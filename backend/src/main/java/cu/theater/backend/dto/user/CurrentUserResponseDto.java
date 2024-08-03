package cu.theater.backend.dto.user;

import cu.theater.backend.dto.emergencycontact.EmergencyContactDto;

public record CurrentUserResponseDto(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        EmergencyContactDto emergencyContactDto
) {
}
