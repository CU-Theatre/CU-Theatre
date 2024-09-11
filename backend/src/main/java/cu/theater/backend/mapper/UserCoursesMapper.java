package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.model.User;
import cu.theater.backend.model.UserCourses;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public interface UserCoursesMapper {
    UserCourses toModel(Long courseId, Long userId);

    Object toDto(User user);
}
