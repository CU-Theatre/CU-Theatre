package cu.theater.backend.controller;

import cu.theater.backend.dto.courseevent.CourseEventCreateDto;
import cu.theater.backend.dto.courseevent.CourseEventResponseDto;
import cu.theater.backend.dto.courseevent.CourseEventUpdateDto;
import cu.theater.backend.service.courseevent.CourseEventService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course-events")
@RequiredArgsConstructor
public class CourseEventController {
    private final CourseEventService courseEventService;

    @GetMapping
    public List<CourseEventResponseDto> getAllCourseEvents() {
        return courseEventService.getAllCourseEvents();
    }

    @GetMapping("/{id}")
    public CourseEventResponseDto getCourseEventById(@PathVariable Long id) {
        return courseEventService.getCourseEventById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseEventResponseDto createCourseEvent(
            @RequestBody CourseEventCreateDto courseEventCreateDto) {
        CourseEventResponseDto courseEvent = courseEventService
                .createCourseEvent(courseEventCreateDto);
        courseEvent.setInterval(courseEventCreateDto.getInterval());
        courseEvent.setCourseId(courseEventCreateDto.getCourseId());
        return courseEvent;
    }

    @PutMapping("/{id}")
    public CourseEventResponseDto updateCourseEvent(
            @PathVariable Long id, @RequestBody CourseEventUpdateDto courseEventUpdateDto) {
        return courseEventService.updateCourseEvent(id, courseEventUpdateDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourseEvent(@PathVariable Long id) {
        courseEventService.deleteCourseEvent(id);
    }
}
