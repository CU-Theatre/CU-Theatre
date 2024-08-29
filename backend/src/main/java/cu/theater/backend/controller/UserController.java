package cu.theater.backend.controller;

import cu.theater.backend.dto.user.CurrentUserResponseDto;
import cu.theater.backend.dto.user.UpdateUserDto;
import cu.theater.backend.dto.user.UserResponseDto;
import cu.theater.backend.model.User;
import cu.theater.backend.service.emergencycontact.EmergencyContactService;
import cu.theater.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final EmergencyContactService emergencyContactService;

    @Operation(summary = "Return current user",
            description = "Return current user name")
    @GetMapping("/current-user")
    public CurrentUserResponseDto returnCurrentUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return new CurrentUserResponseDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                emergencyContactService.getEmergencyContact(user.getId()));
    }

    @Operation(summary = "Update user details",
            description = "Update user details by id")
    @PutMapping("/{id}")
    public UserResponseDto updateUserDetails(@PathVariable Long id,
                                             @RequestBody UpdateUserDto updateUserDto) {
        return userService.updateUserDetails(id, updateUserDto);
    }

    @Operation(summary = "Delete user by id")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
