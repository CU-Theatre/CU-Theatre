package cu.theater.backend.service.courseevent;

import cu.theater.backend.dto.courseevent.CourseEventCreateDto;
import cu.theater.backend.dto.courseevent.CourseEventResponseDto;
import cu.theater.backend.dto.courseevent.CourseEventUpdateDto;
import cu.theater.backend.exception.EntityNotFoundException;
import cu.theater.backend.mapper.CourseEventMapper;
import cu.theater.backend.model.CourseEvent;
import cu.theater.backend.repository.CourseEventRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseEventServiceImpl implements CourseEventService {
    private final CourseEventRepository courseEventRepository;
    private final CourseEventMapper courseEventMapper;

    @Override
    public List<CourseEventResponseDto> getAllCourseEvents() {
        return courseEventRepository.findAll().stream()
                .map(courseEventMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public CourseEventResponseDto getCourseEventById(Long id) {
        CourseEvent courseEvent = courseEventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CourseEvent not found with id "
                        + id));
        return courseEventMapper.toResponseDto(courseEvent);
    }

    @Override
    public CourseEventResponseDto createCourseEvent(CourseEventCreateDto courseEventCreateDto) {
        CourseEvent courseEvent = courseEventMapper.toEntity(courseEventCreateDto);
        courseEvent = courseEventRepository.save(courseEvent);
        return courseEventMapper.toResponseDto(courseEvent);
    }

    @Override
    public CourseEventResponseDto updateCourseEvent(Long id,
                                                    CourseEventUpdateDto courseEventUpdateDto) {
        CourseEvent courseEvent = courseEventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CourseEvent not found with id "
                        + id));
        courseEventMapper.updateEntityFromDto(courseEventUpdateDto, courseEvent);
        courseEvent = courseEventRepository.save(courseEvent);
        return courseEventMapper.toResponseDto(courseEvent);
    }

    @Override
    public void deleteCourseEvent(Long id) {
        CourseEvent courseEvent = courseEventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CourseEvent not found with id "
                        + id));
        courseEventRepository.delete(courseEvent);
    }
}
