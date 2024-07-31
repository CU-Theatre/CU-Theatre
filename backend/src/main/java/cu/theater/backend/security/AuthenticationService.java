package cu.theater.backend.security;

import cu.theater.backend.dto.user.UserLoginRequestDto;
import cu.theater.backend.dto.user.UserLoginResponseDto;
import cu.theater.backend.model.User;
import cu.theater.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public UserLoginResponseDto authenticate(UserLoginRequestDto requestDto) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDto.email(), requestDto.password())
        );
        String token = jwtUtil.generateToken(authentication.getName());
        return new UserLoginResponseDto(token, findUserByEmail(authentication.getName()));
    }

    private String findUserByEmail(String email) {
        User byEmail = userService.getByEmail(email);
        return byEmail.getFirstName();
    }
}
