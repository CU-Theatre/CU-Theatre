package cu.theater.backend.service.roadmap;

import cu.theater.backend.dto.roadmap.CreateRoadMapDto;
import cu.theater.backend.dto.roadmap.RoadMapDto;
import cu.theater.backend.mapper.CourseMapper;
import cu.theater.backend.mapper.RoadMapMapper;
import cu.theater.backend.model.RoadMap;
import cu.theater.backend.repository.CourseRepository;
import cu.theater.backend.repository.RoadMapRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoadMapServiceImpl implements RoadMapService {
    private final RoadMapRepository roadMapRepository;
    private final RoadMapMapper roadMapMapper;
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    @Override
    public RoadMapDto create(CreateRoadMapDto roadMapDto) {
        RoadMap roadMap = roadMapMapper.toModel(roadMapDto);
        roadMap.setCourse(courseMapper.toModel(
                courseRepository.findById(roadMapDto.courseId()).map(courseMapper::toDto)
                        .orElseThrow(() -> new IllegalStateException("Course not found"))));
        roadMapRepository.save(roadMap);
        return roadMapMapper.toDto(roadMap);
    }

    @Override
    public RoadMapDto update(Long id, CreateRoadMapDto roadMapDto) {
        roadMapRepository.findById(id).orElseThrow(()
                -> new RuntimeException("RoadMap not found"));
        RoadMap roadMap = roadMapMapper.toModel(roadMapDto);
        roadMap.setId(id);
        return roadMapMapper.toDto(roadMapRepository.save(roadMap));
    }

    @Override
    public void delete(Long id) {
        roadMapRepository.deleteById(id);
    }

    @Override
    public RoadMapDto findById(Long id) {
        return roadMapRepository.findById(id)
                .map(roadMapMapper::toDto)
                .orElseThrow(() -> new RuntimeException("RoadMap not found"));
    }

    @Override
    public RoadMapDto findByCourseId(Long courseId) {
        return roadMapRepository.findByCourseId(courseId)
                .map(roadMapMapper::toDto)
                .orElseThrow(() -> new RuntimeException("RoadMap not found"));
    }

    @Override
    public List<RoadMapDto> findAllByCourseId(Long courseId) {
        return roadMapRepository.findAllByCourseId(courseId)
                .stream()
                .map(roadMapMapper::toDto)
                .toList();
    }
}
