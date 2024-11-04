package cu.theater.backend.service.course;

import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.dto.course.CreateCourseRequestDto;
import cu.theater.backend.dto.course.DeleteDto;
import cu.theater.backend.dto.course.UpdateCourseDto;
import cu.theater.backend.dto.roadmap.RoadMapDto;
import cu.theater.backend.exception.EntityNotFoundException;
import cu.theater.backend.mapper.CourseMapper;
import cu.theater.backend.mapper.UserCoursesMapper;
import cu.theater.backend.model.Course;
import cu.theater.backend.model.CourseImage;
import cu.theater.backend.model.Status;
import cu.theater.backend.model.User;
import cu.theater.backend.model.UserCourses;
import cu.theater.backend.repository.CourseRepository;
import cu.theater.backend.repository.UserRepository;
import cu.theater.backend.repository.UsersCoursesRepository;
import cu.theater.backend.service.filedata.FileStorageService;
import cu.theater.backend.service.roadmap.RoadMapService;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final FileStorageService fileStorageService;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseMapper courseMapper;
    private final UserCoursesMapper userCoursesMapper;
    private final UsersCoursesRepository usersCoursesRepository;
    private final RoadMapService roadMapService;

    @Override
    @Transactional
    public CourseDto addUserToCourse(Long courseId, Long userId) {
        List<User> users = getUsersByCourseId(courseId);
        if (users.size() >= courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course not found"))
                .getMaxStudents()) {
            throw new IllegalStateException("Course is full");
        }
        UserCourses userCourses = userCoursesMapper.toModel(courseId, userId);
        userCourses.setCourse(courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course not found")));
        userCourses.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found")));
        usersCoursesRepository.save(userCourses);
        CourseDto dto = courseMapper.toDto(userCourses.getCourse());
        CourseDto courseDto = mapCourseToDtoWithImages(userCourses.getCourse());
        dto.setImages(courseDto.getImages());
        return dto;
    }

    @Override
    @Transactional
    public CourseDto updateCourseStatus(UpdateCourseDto updateCourseStatusDto,
                                        Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course not found"));
        course.setStatus(updateCourseStatusDto.status());
        course.setName(updateCourseStatusDto.name());
        course.setDescription(updateCourseStatusDto.description());
        course.setIcon(updateCourseStatusDto.icon());
        course.setPrice(updateCourseStatusDto.price());

        courseRepository.save(course);
        mapCourseToDtoWithImages(course);
        return courseMapper.toDto(course);
    }

    @Override
    public List<CourseDto> findAllCoursesByUserId(Long userId) {
        return usersCoursesRepository.findAllByUsersId(userId)
                .stream()
                .map(this::mapCourseToDtoWithImages)
                .toList();
    }

    @Override
    public List<CourseDto> findAllCourses() {
        List<CourseDto> courses = courseRepository.findAll()
                .stream()
                .map(course -> {
                    CourseDto dto = courseMapper.toDto(course);
                    dto.setImages(course.getImages().stream()
                            .map(CourseImage::getImagePath)
                            .toList());
                    return dto;
                })
                .toList();
        courses.forEach(courseDto -> addRoadmapAndUsers(courseDto.getId(), courseDto));
        courses.forEach(courseDto -> courseDto.setUsersId(
                new HashSet<>(usersCoursesRepository.findUserIdsByCourseId(courseDto.getId()))));
        return courses;
    }

    @Override
    public CourseDto findCourseById(Long courseId) {
        CourseDto dto = courseRepository.findById(courseId)
                .map(this::mapCourseToDtoWithImages)
                .orElseThrow(() -> new IllegalStateException("Course not found"));
        addRoadmapAndUsers(courseId, dto);
        return dto;
    }

    @Override
    @Transactional
    public DeleteDto deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
        return new DeleteDto(courseId);
    }

    @Transactional
    @Override
    public void unsignUserFromCourse(Long courseId, Long userId) {
        usersCoursesRepository.deleteUserFromCourse(courseId, userId);
    }

    public CourseDto addCourseImages(Long courseId, MultipartFile imageFile)
            throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        if (imageFile != null && !imageFile.isEmpty()) {
            String imagePath = fileStorageService
                    .saveFile(imageFile, "course", false, courseId);

            CourseImage courseImage = new CourseImage();
            courseImage.setImagePath(imagePath);
            courseImage.setCourse(course);
            course.getImages().add(courseImage);
        }
        Course savedCourse = courseRepository.save(course);
        return mapCourseToDtoWithImages(savedCourse);
    }

    @Override
    public void deleteCourseImage(Long courseId, String imageName) {
        // Retrieve the course by ID
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        // Find the image in the course's image list by matching the image name
        CourseImage courseImage = course.getImages().stream()
                .filter(image -> image.getImagePath().endsWith(imageName))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Image not found"));

        // Remove the image from the course's image list
        course.getImages().remove(courseImage);

        // Save the updated course to persist the change in the database
        courseRepository.save(course);

        // Delete the file from the file storage system using full path
        fileStorageService.deleteFile(courseImage.getImagePath());
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
        dto.setUsersId(new HashSet<>(usersCoursesRepository
                .findUserIdsByCourseId(course.getId())));
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
        course.setIcon(requestDto.getIcon());
        course.setMaxStudents(requestDto.getMaxStudents());
        return course;
    }

    private void addRoadmapAndUsers(Long courseId, CourseDto dto) {
        List<RoadMapDto> allByCourseId = roadMapService.findAllByCourseId(courseId);
        dto.setRoadMaps(allByCourseId);
        dto.setUsersId(new HashSet<>(usersCoursesRepository.findUserIdsByCourseId(courseId)));
    }

    private List<User> getUsersByCourseId(Long courseId) {
        return usersCoursesRepository.findUsersByCourseId(courseId);
    }

    private CourseDto mapCourseToDtoWithImages(Course course) {
        CourseDto dto = courseMapper.toDto(course);
        dto.setImages(course.getImages().stream()
                .map(CourseImage::getImagePath)
                .toList());
        return dto;
    }

}
