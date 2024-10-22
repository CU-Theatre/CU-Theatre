package cu.theater.backend.service.courseevent;

import cu.theater.backend.dto.courseevent.CourseEventCreateDto;
import cu.theater.backend.dto.courseevent.CourseEventResponseDto;
import cu.theater.backend.dto.courseevent.CourseEventUpdateDto;
import java.util.List;

public interface CourseEventService {

    List<CourseEventResponseDto> getAllCourseEvents();

    CourseEventResponseDto getCourseEventById(Long id);

    CourseEventResponseDto createCourseEvent(CourseEventCreateDto courseEventCreateDto);

    CourseEventResponseDto updateCourseEvent(Long id, CourseEventUpdateDto courseEventUpdateDto);

    void deleteCourseEvent(Long id);
}
