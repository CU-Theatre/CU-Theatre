package cu.theater.backend.service.user;

import cu.theater.backend.dto.user.UpdateUserDto;
import cu.theater.backend.dto.user.UpdateUserRoleRequestDto;
import cu.theater.backend.dto.user.UserRegistrationRequestDto;
import cu.theater.backend.dto.user.UserResponseDto;
import cu.theater.backend.exception.EntityNotFoundException;
import cu.theater.backend.exception.RegistrationException;
import cu.theater.backend.mapper.UserMapper;
import cu.theater.backend.model.Role;
import cu.theater.backend.model.User;
import cu.theater.backend.repository.RoleRepository;
import cu.theater.backend.repository.UserRepository;
import cu.theater.backend.repository.UsersCoursesRepository;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UsersCoursesRepository usersCoursesRepository;

    @Override
    public UserResponseDto registerUser(UserRegistrationRequestDto requestDto)
            throws RegistrationException {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RegistrationException(
                    "Can't register user - user with this email already exists!");
        }
        User user = userMapper.toModel(requestDto);
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        Role role = roleRepository.findByName(Role.RoleName.ROLE_USER);
        user.setRoles(Set.of(role));
        user.setPhoneNumber(requestDto.getPhoneNumber());
        UserResponseDto dto = userMapper.toDto(userRepository.save(user));
        return setCurrentCourses(dto);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserResponseDto getById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Can't find user by id=" + id));
        if (user.isDeleted()) {
            throw new EntityNotFoundException("Can't find user by id=" + id);
        }
        UserResponseDto dto = userMapper.toDto(user);
        return setCurrentCourses(dto);
    }

    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException("Can't find user by email=" + email));
    }

    @Override
    public UserResponseDto updateUserRole(Long userId, UpdateUserRoleRequestDto requestDto) {
        User user = getUserById(userId);
        user.setRoles(Set.of(roleRepository.findByName(requestDto.roleName())));
        User savedUser = userRepository.save(user);
        UserResponseDto dto = userMapper.toDto(savedUser);
        return setCurrentCourses(dto);
    }

    @Override
    public UserResponseDto updateUserDetails(Long userId, UpdateUserDto updateUserDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Can't find user with ID: " + userId));
        user.setFirstName(updateUserDto.firstName());
        user.setEmail(updateUserDto.email());
        user.setLastName(updateUserDto.lastName());
        user.setPhoneNumber(updateUserDto.phoneNumber());
        UserResponseDto dto = userMapper.toDto(userRepository.save(user));
        return setCurrentCourses(dto);
    }

    @Override
    public UserResponseDto finishDramaCourse(Long userId) {
        User user = getUserById(userId);
        user.setDramaCourseFinished(true);
        UserResponseDto dto = userMapper.toDto(userRepository.save(user));
        return setCurrentCourses(dto);
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(()
                        -> new EntityNotFoundException("Can't find user with ID: " + userId));
    }

    private UserResponseDto setCurrentCourses(UserResponseDto dto) {
        User user = getUserById(dto.getId());
        dto.setCurrentCourses(new ArrayList<>(usersCoursesRepository
                .findCourseIdsByUserId(user.getId())));
        Optional<User> userDrama = userRepository.findByIdWhereDramaCourseIsFinished(dto.getId());
        dto.setDramaCourseFinished(userDrama.isPresent());
        return dto;
    }

}
