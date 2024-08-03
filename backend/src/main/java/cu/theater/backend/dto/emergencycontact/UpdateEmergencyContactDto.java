package cu.theater.backend.dto.emergencycontact;

public record UpdateEmergencyContactDto(
        Long id,
        String firstName,
        String lastName,
        String relation,
        String phoneNumber
) {
}
