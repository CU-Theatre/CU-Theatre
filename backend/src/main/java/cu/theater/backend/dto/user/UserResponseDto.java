package cu.theater.backend.dto.user;

import cu.theater.backend.model.Role;

public record UserResponseDto(
        Long id,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        Role.RoleName roleName){
//TODO : drama courses finish,  current courses
}
