package cu.theater.backend.service.course;

import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.dto.course.CreateCourseRequestDto;
import cu.theater.backend.dto.course.DeleteDto;
import cu.theater.backend.dto.course.UpdateCourseDto;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CourseService {

    CourseDto createCourse(CreateCourseRequestDto createCourseRequestDto, Long userId);

    CourseDto addUserToCourse(Long courseId, Long userId);

    CourseDto updateCourseStatus(UpdateCourseDto updateCourseStatusDto, Long courseId);

    List<CourseDto> findAllCoursesByUserId(Long userId);

    List<CourseDto> findAllCourses();

    CourseDto findCourseById(Long courseId);

    DeleteDto deleteCourse(Long courseId);

    void unsignUserFromCourse(Long courseId, Long userId);

    CourseDto addCourseImages(Long courseId, MultipartFile imageFile) throws IOException;

    void deleteCourseImage(Long courseId, String imageName);
}
