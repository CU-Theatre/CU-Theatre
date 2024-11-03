package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.courseevent.CourseEventCreateDto;
import cu.theater.backend.dto.courseevent.CourseEventResponseDto;
import cu.theater.backend.dto.courseevent.CourseEventUpdateDto;
import cu.theater.backend.model.CourseEvent;
import cu.theater.backend.repository.CourseRepository;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public abstract class CourseEventMapper {
    @Autowired
    private CourseRepository courseRepository;

    public abstract CourseEvent toEntity(CourseEventCreateDto courseEventCreateDto);

    public abstract CourseEventResponseDto toResponseDto(CourseEvent courseEvent);

    public abstract void updateEntityFromDto(CourseEventUpdateDto courseEventUpdateDto,
                                             @MappingTarget CourseEvent courseEvent);
}
