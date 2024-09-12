package cu.theater.backend.service.roadmap;

import cu.theater.backend.dto.roadmap.CreateRoadMapDto;
import cu.theater.backend.dto.roadmap.RoadMapDto;
import java.util.List;

public interface RoadMapService {
    RoadMapDto create(CreateRoadMapDto roadMapDto);

    RoadMapDto update(Long id, CreateRoadMapDto roadMapDto);

    void delete(Long id);

    RoadMapDto findById(Long id);

    RoadMapDto findByCourseId(Long courseId);

    List<RoadMapDto> findAllByCourseId(Long courseId);
}
