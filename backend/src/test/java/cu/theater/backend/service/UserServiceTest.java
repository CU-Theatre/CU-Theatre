package cu.theater.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import cu.theater.backend.dto.user.UpdateUserDto;
import cu.theater.backend.dto.user.UpdateUserRoleRequestDto;
import cu.theater.backend.dto.user.UserRegistrationRequestDto;
import cu.theater.backend.dto.user.UserResponseDto;
import cu.theater.backend.exception.RegistrationException;
import cu.theater.backend.mapper.UserMapper;
import cu.theater.backend.model.Role;
import cu.theater.backend.model.User;
import cu.theater.backend.repository.RoleRepository;
import cu.theater.backend.repository.UserRepository;
import cu.theater.backend.service.user.UserServiceImpl;
import java.util.Optional;
import java.util.Set;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private RoleRepository roleRepository;

    @Test
    @DisplayName("Should register an user and "
            + "return the user response DTO when a valid request is provided")
    public void registerUserTest_ValidRequest_Ok() throws RegistrationException {
        //Given
        User user = createUser();
        UserRegistrationRequestDto requestDto = createUserRegistrationRequestDto(createUser());

        Role role = new Role();
        role.setId(1L);
        role.setName(Role.RoleName.ROLE_USER);

        when(userMapper.toModel(requestDto)).thenReturn(user);
        when(passwordEncoder.encode(requestDto.getPassword()))
                .thenReturn("$2a$10$vEjGON2nXfnHAlxWEH4bKunFzAPNNj80A2XPpQsenfF8MicVa9vH6");
        when(roleRepository.findByName(Role.RoleName.ROLE_USER)).thenReturn(role);
        user.setId(1L);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toDto(user)).thenReturn(createUserResponse());

        UserResponseDto expected = createUserResponse();

        //When
        UserResponseDto actual = userService.registerUser(requestDto);

        //Then
        assertEquals(expected, actual);

        verify(userMapper, times(1)).toModel(requestDto);
        verify(passwordEncoder, times(1)).encode(requestDto.getPassword());
        verify(roleRepository, times(1)).findByName(Role.RoleName.ROLE_USER);
        verify(userRepository, times(1)).save(user);
        verify(userMapper, times(1)).toDto(user);

    }

    @Test
    @DisplayName("Verify correct UserResponseDto is returned by getProfileInfo() when all ok")
    void getProfileInfo_AllOk_ShouldReturnCorrectUserResponseDto() {
        //Given
        Long id = 1L;
        User user = createUser();
        user.setId(id);
        UserResponseDto expected = createUserResponse();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userMapper.toDto(user)).thenReturn(createUserResponse());

        //When
        UserResponseDto actual = userService.getById(id);

        //Then
        assertEquals(expected, actual);

        verify(userRepository, times(1)).findById(id);
        verify(userMapper, times(1)).toDto(user);
    }

    private UpdateUserDto updateUserDto(User user) {
        return new UpdateUserDto(
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getEmail()
        );
    }

    @Test
    @DisplayName("Verify updateUserRole() updates user's role correctly")
    void updateUserRole_AllOk_ShouldReturnUpdatedRoleUserResponseDto() {
        //Given
        Long id = 1L;
        User user = createUser();
        user.setId(id);

        Role adminRole = new Role();
        adminRole.setId(2L);
        adminRole.setName(Role.RoleName.ROLE_ADMIN);

        UpdateUserRoleRequestDto requestDto = getUpdateUserRoleRequestDto();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(roleRepository.findByName(requestDto.roleName())).thenReturn(adminRole);
        user.setRoles(Set.of(adminRole));
        when(userRepository.save(user)).thenReturn(user);
        UserResponseDto expected = new UserResponseDto(
                id,
                "bob@email.com",
                "Bob",
                "Smith",
                "1234567890",
                Role.RoleName.ROLE_ADMIN
        );
        when(userMapper.toDto(user)).thenReturn(expected);

        //When
        UserResponseDto actual = userService.updateUserRole(id, requestDto);

        //Then
        assertEquals(expected, actual);

        verify(userRepository, times(1)).findById(id);
        verify(roleRepository, times(1)).findByName(requestDto.roleName());
        verify(userRepository, times(1)).save(user);
        verify(userMapper, times(1)).toDto(user);
    }

    @Test
    public void getByIdTest() {
        Long id = 1L;
        User user = createUser();
        user.setId(id);

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userMapper.toDto(user)).thenReturn(createUserResponse());

        UserResponseDto expected = createUserResponse();
        UserResponseDto actual = userService.getById(id);

        assertEquals(expected, actual);

    }

    @Test
    public void updateUserDetailsTest() {
        //Given
        Long id = 1L;
        User user = createUser();
        user.setId(id);

        UpdateUserDto updateUserDto = updateUserDto(user);

        when(userRepository.findByEmail(updateUserDto.email())).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toDto(user)).thenReturn(createUserResponse());

        UserResponseDto expected = createUserResponse();

        //When
        UserResponseDto actual = userService.updateUserDetails(updateUserDto);

        //Then

        assertEquals(expected, actual);

        verify(userRepository, times(1)).findByEmail(updateUserDto.email());
        verify(userRepository, times(1)).save(user);
        verify(userMapper, times(1)).toDto(user);
    }

    private User createUser() {
        Role role = Role.builder()
                .id(1L)
                .name(Role.RoleName.ROLE_USER)
                .build();
        return User.builder()
                .id(11L)
                .email("11@ex.com")
                .firstName("Test")
                .lastName("User")
                .password("password")
                .phoneNumber("1234567890")
                .roles(Set.of(role))
                .isDeleted(false)
                .build();
    }

    @Contract(" -> new")
    private @NotNull UpdateUserRoleRequestDto getUpdateUserRoleRequestDto() {
        return new UpdateUserRoleRequestDto(Role.RoleName.ROLE_ADMIN);
    }

    private UserRegistrationRequestDto createUserRegistrationRequestDto(@NotNull User user) {
        return UserRegistrationRequestDto.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .repeatPassword(user.getPassword())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    private UserResponseDto createUserResponse() {
        return new UserResponseDto(11L,
                 "11@ex.com",
              "Test",
                "User",
        "1234567890",
                 Role.RoleName.ROLE_USER);
    }
}
