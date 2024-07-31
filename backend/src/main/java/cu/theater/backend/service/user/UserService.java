package cu.theater.backend.service.user;

import cu.theater.backend.dto.user.UserRegistrationRequestDto;
import cu.theater.backend.dto.user.UserResponseDto;
import cu.theater.backend.exception.RegistrationException;
import cu.theater.backend.model.User;

public interface UserService {
    UserResponseDto registerUser(UserRegistrationRequestDto requestDto)
            throws RegistrationException;

    void deleteById(Long id);

    User getById(Long id);

    User getByEmail(String email);

}
