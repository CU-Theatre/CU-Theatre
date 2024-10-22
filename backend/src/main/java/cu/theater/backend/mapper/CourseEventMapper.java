package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.courseevent.CourseEventCreateDto;
import cu.theater.backend.dto.courseevent.CourseEventResponseDto;
import cu.theater.backend.dto.courseevent.CourseEventUpdateDto;
import cu.theater.backend.model.CourseEvent;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public interface CourseEventMapper {
    CourseEventResponseDto toResponseDto(CourseEvent courseEvent);

    CourseEvent toEntity(CourseEventCreateDto courseEventCreateDto);

    void updateEntityFromDto(CourseEventUpdateDto courseEventUpdateDto,
                             @MappingTarget CourseEvent courseEvent);
}
