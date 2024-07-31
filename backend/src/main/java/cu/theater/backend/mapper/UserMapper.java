package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.user.UserRegistrationRequestDto;
import cu.theater.backend.dto.user.UserResponseDto;
import cu.theater.backend.model.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public interface UserMapper {
    User toModel(UserRegistrationRequestDto registrationRequestDto);

    UserResponseDto toDto(User user);
}
