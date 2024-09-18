package cu.theater.backend.service.course;

import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.dto.course.CreateCourseRequestDto;
import cu.theater.backend.dto.course.DeleteDto;
import cu.theater.backend.dto.course.UpdateCourseDto;
import cu.theater.backend.dto.roadmap.RoadMapDto;
import cu.theater.backend.mapper.CourseMapper;
import cu.theater.backend.mapper.UserCoursesMapper;
import cu.theater.backend.model.Course;
import cu.theater.backend.model.Status;
import cu.theater.backend.model.UserCourses;
import cu.theater.backend.repository.CourseRepository;
import cu.theater.backend.repository.UserRepository;
import cu.theater.backend.repository.UsersCoursesRepository;
import cu.theater.backend.service.roadmap.RoadMapService;
import java.util.HashSet;
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
    private final UserCoursesMapper userCoursesMapper;
    private final UsersCoursesRepository usersCoursesRepository;
    private final RoadMapService roadMapService;

    @Override
    public CourseDto addUserToCourse(Long courseId, Long userId) {
        UserCourses userCourses = userCoursesMapper.toModel(courseId, userId);
        userCourses.setCourse(courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course not found")));
        userCourses.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found")));
        usersCoursesRepository.save(userCourses);
        CourseDto dto = courseMapper.toDto(userCourses.getCourse());
        return dto;
    }

    @Override
    public CourseDto updateCourseStatus(UpdateCourseDto updateCourseStatusDto,
                                        Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course not found"));
        course.setStatus(updateCourseStatusDto.status());
        course.setName(updateCourseStatusDto.name());
        course.setDescription(updateCourseStatusDto.description());
        course.setImage(updateCourseStatusDto.image());
        course.setIcon(updateCourseStatusDto.icon());
        course.setPrice(updateCourseStatusDto.price());
        courseRepository.save(course);
        return courseMapper.toDto(course);
    }

    @Override
    public List<CourseDto> findAllCoursesByUserId(Long userId) {
        return usersCoursesRepository.findAllByUsersId(userId)
                .stream()
                .map(courseMapper::toDto)
                .toList();
    }

    @Override
    public List<CourseDto> findAllCourses() {
        List<CourseDto> list = courseRepository.findAll()
                .stream()
                .map(courseMapper::toDto)
                .toList();
        list.forEach(courseDto -> addRoadmapAndUsers(courseDto.getId(), courseDto));
        list.forEach(courseDto -> courseDto.setUsersId(
                new HashSet<>(usersCoursesRepository
                        .findUserIdsByCourseId(courseDto.getId()))));
        return list;
    }

    @Override
    public CourseDto findCourseById(Long courseId) {
        CourseDto dto = courseRepository.findById(courseId)
                .map(courseMapper::toDto)
                .orElseThrow(() -> new IllegalStateException("Course not found"));
        addRoadmapAndUsers(courseId, dto);
        return dto;
    }

    @Override
    public DeleteDto deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
        return new DeleteDto(courseId);
    }

    @Transactional
    @Override
    public CourseDto createCourse(CreateCourseRequestDto createCourseRequestDto,
                                  Long userId) {
        Course course = createCourse(createCourseRequestDto);
        courseRepository.save(course);
        CourseDto dto = courseMapper.toDto(course);
        List<RoadMapDto> allByCourseId = roadMapService.findAllByCourseId(course.getId());
        dto.setRoadMaps(allByCourseId);
        dto.setUsersId(new HashSet<>(usersCoursesRepository.findUserIdsByCourseId(course.getId())));
        return dto;
    }

    private Course createCourse(CreateCourseRequestDto requestDto) {
        Course course = new Course();
        course.setName(requestDto.getName());
        course.setDescription(requestDto.getDescription());
        course.setStatus(Status.IN_PROGRESS);
        course.setStartDate(requestDto.getStartDate());
        course.setFinishDate(requestDto.getFinishDate());
        course.setPrice(requestDto.getPrice());
        course.setImage(requestDto.getImage());
        course.setIcon(requestDto.getIcon());
        return course;
    }

    private void addRoadmapAndUsers(Long courseId, CourseDto dto) {
        List<RoadMapDto> allByCourseId = roadMapService.findAllByCourseId(courseId);
        dto.setRoadMaps(allByCourseId);
        dto.setUsersId(new HashSet<>(usersCoursesRepository.findUserIdsByCourseId(courseId)));
    }

}
