package cu.theater.backend.service.course;

import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.dto.course.CreateCourseRequestDto;
import cu.theater.backend.dto.course.DeleteDto;
import cu.theater.backend.dto.course.UpdateCourseDto;
import java.util.List;

public interface CourseService {

    CourseDto addCourse(Long userId, CreateCourseRequestDto createCourseRequestDto);

    CourseDto updateCourseStatus(UpdateCourseDto updateCourseStatusDto, Long courseId);

    List<CourseDto> findAllCourses(Long userId);

    CourseDto findCourseById(Long courseId);

    DeleteDto deleteCourse(Long courseId);

}
