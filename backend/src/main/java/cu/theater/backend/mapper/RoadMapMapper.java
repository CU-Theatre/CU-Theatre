package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.roadmap.CreateRoadMapDto;
import cu.theater.backend.dto.roadmap.RoadMapDto;
import cu.theater.backend.model.RoadMap;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public interface RoadMapMapper {
    RoadMapDto toDto(RoadMap roadMap);

    @Mapping(target = "course.id", source = "courseId")
    RoadMap toModel(CreateRoadMapDto roadMapDto);
}
