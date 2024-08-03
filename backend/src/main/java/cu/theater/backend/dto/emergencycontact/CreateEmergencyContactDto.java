package cu.theater.backend.dto.emergencycontact;

import jakarta.validation.constraints.NotNull;

public record CreateEmergencyContactDto(
        @NotNull
        Long userId,
        @NotNull
        String firstName,
        @NotNull
        String lastName,
        @NotNull
        String phoneNumber,
        @NotNull
        String relation) {
}
