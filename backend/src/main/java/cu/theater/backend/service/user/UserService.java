package cu.theater.backend.service.user;

import cu.theater.backend.dto.user.UpdateUserDto;
import cu.theater.backend.dto.user.UpdateUserRoleRequestDto;
import cu.theater.backend.dto.user.UserRegistrationRequestDto;
import cu.theater.backend.dto.user.UserResponseDto;
import cu.theater.backend.exception.RegistrationException;
import cu.theater.backend.model.User;

public interface UserService {
    UserResponseDto registerUser(UserRegistrationRequestDto requestDto)
            throws RegistrationException;

    void deleteById(Long id);

    UserResponseDto getById(Long id);

    User getByEmail(String email);

    UserResponseDto updateUserRole(Long userId, UpdateUserRoleRequestDto requestDto);

    UserResponseDto updateUserDetails(UpdateUserDto updateUserDto);

}
