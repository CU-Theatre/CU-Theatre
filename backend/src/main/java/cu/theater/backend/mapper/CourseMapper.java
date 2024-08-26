package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.model.Course;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public interface CourseMapper {
    CourseDto toDto(Course course);

    Course toModel(CourseDto courseDto);
}
