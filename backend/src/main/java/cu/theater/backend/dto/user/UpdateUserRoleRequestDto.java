package cu.theater.backend.dto.user;

import cu.theater.backend.model.Role;

public record UpdateUserRoleRequestDto(
        Role.RoleName roleName
) {
}
