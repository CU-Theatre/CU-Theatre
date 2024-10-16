package cu.theater.backend.controller;

import cu.theater.backend.dto.user.UserLoginRequestDto;
import cu.theater.backend.dto.user.UserLoginResponseDto;
import cu.theater.backend.dto.user.UserRegistrationRequestDto;
import cu.theater.backend.dto.user.UserResponseDto;
import cu.theater.backend.exception.RegistrationException;
import cu.theater.backend.security.AuthenticationService;
import cu.theater.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @Operation(summary = "Login",
            description = "Return token and user name if user is authenticated")
    @PostMapping("/login")
    public UserLoginResponseDto login(@RequestBody UserLoginRequestDto requestDto) {
        return authenticationService.authenticate(requestDto);
    }

    @Operation(summary = "Register",
            description = "Return user if user is registered")
    @PostMapping("/register")
    public UserResponseDto registerUser(@RequestBody @Valid UserRegistrationRequestDto requestDto)
            throws RegistrationException {
        return userService.registerUser(requestDto);
    }

}
