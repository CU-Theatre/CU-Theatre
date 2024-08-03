package cu.theater.backend.dto.emergencycontact;

public record EmergencyContactDto(
        Long id,
        Long userId,
        String firstName,
        String lastName,
        String relation,
        String phoneNumber
) {
}
