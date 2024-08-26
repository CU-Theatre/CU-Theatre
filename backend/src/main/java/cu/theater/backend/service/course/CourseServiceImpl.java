package cu.theater.backend.service.course;

import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.dto.course.CreateCourseRequestDto;
import cu.theater.backend.dto.course.DeleteDto;
import cu.theater.backend.dto.course.UpdateCourseDto;
import cu.theater.backend.mapper.CourseMapper;
import cu.theater.backend.model.Course;
import cu.theater.backend.model.Status;
import cu.theater.backend.repository.CourseRepository;
import cu.theater.backend.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseMapper courseMapper;

    @Transactional
    @Override
    public CourseDto addCourse(Long userId,CreateCourseRequestDto createCourseRequestDto) {
        Course course = createCourse(userId, createCourseRequestDto);
        courseRepository.save(course);
        return courseMapper.toDto(course);
    }

    @Override
    public CourseDto updateCourseStatus(UpdateCourseDto updateCourseStatusDto,
                                        Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course not found"));
        course.setStatus(updateCourseStatusDto.status());
        course.setName(updateCourseStatusDto.name());
        course.setDescription(updateCourseStatusDto.description());
        courseRepository.save(course);
        return courseMapper.toDto(course);
    }

    @Override
    public List<CourseDto> findAllCourses(Long userId) {
        return null;
    }

    @Override
    public CourseDto findCourseById(Long courseId) {
        return courseRepository.findById(courseId)
                .map(courseMapper::toDto)
                .orElseThrow(() -> new IllegalStateException("Course not found"));
    }

    @Override
    public DeleteDto deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
        return new DeleteDto(courseId);
    }

    private Course createCourse(Long userId, CreateCourseRequestDto requestDto) {
        Course course = new Course();
        course.setName(requestDto.name());
        course.setDescription(requestDto.description());
        course.setStatus(Status.IN_PROGRESS);
        course.setStartDate(LocalDateTime.now());
        course.setImage(requestDto.image());
        return course;
    }

}
