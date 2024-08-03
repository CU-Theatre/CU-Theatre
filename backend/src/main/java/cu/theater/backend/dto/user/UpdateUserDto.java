package cu.theater.backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UpdateUserDto(
        @NotNull
        String firstName,
        @NotNull
        String lastName,
        @NotNull
        String phoneNumber,
        @Email
        String email
) {
}
