package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.courseevent.CourseEventCreateDto;
import cu.theater.backend.dto.courseevent.CourseEventResponseDto;
import cu.theater.backend.dto.courseevent.CourseEventUpdateDto;
import cu.theater.backend.exception.EntityNotFoundException;
import cu.theater.backend.model.Course;
import cu.theater.backend.model.CourseEvent;
import cu.theater.backend.repository.CourseRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public abstract class CourseEventMapper {
    @Autowired
    private CourseRepository courseRepository;

    @Mapping(target = "course", expression = "java(getCourse(courseEventCreateDto.getCourseId()))")
    public abstract CourseEvent toEntity(CourseEventCreateDto courseEventCreateDto);

    public abstract CourseEventResponseDto toResponseDto(CourseEvent courseEvent);

    public abstract void updateEntityFromDto(CourseEventUpdateDto courseEventUpdateDto,
                                             @MappingTarget CourseEvent courseEvent);

    protected Course getCourse(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with id "
                        + courseId));
    }
}
