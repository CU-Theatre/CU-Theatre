package cu.theater.backend.controller;

import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.dto.course.CreateCourseRequestDto;
import cu.theater.backend.dto.course.DeleteDto;
import cu.theater.backend.dto.course.UpdateCourseDto;
import cu.theater.backend.model.User;
import cu.theater.backend.service.course.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;

    @Operation(summary = "creates course",
            description = "Creates course if course")
    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    CourseDto createCourse(@RequestBody CreateCourseRequestDto requestDto,
                           Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return courseService.createCourse(requestDto, user.getId());
    }

    @Operation(summary = "add user to course",
            description = "Adding user to a Specific course")
    @PostMapping("/add/{courseId}")
    CourseDto addUserToCourse(Authentication authentication,
                              @PathVariable Long courseId) {
        User user = (User) authentication.getPrincipal();
        return courseService.addUserToCourse(courseId, user.getId());
    }

    @Operation(summary = "Get all courses",
            description = "Return all courses for the current user")
    @GetMapping("/allForUser")
    List<CourseDto> getAllCoursesByUserId(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return courseService.findAllCoursesByUserId(user.getId());
    }

    @Operation(summary = "Get all courses",
            description = "Return all courses ")
    @GetMapping("/all")
    List<CourseDto> getAllCourses() {
        return courseService.findAllCourses();
    }

    @Operation(summary = "Update course status")
    @PatchMapping("/{id}")
    CourseDto updateCourseStatus(@RequestBody UpdateCourseDto requestDto,
                                @PathVariable Long id) {
        return courseService.updateCourseStatus(requestDto, id);
    }

    @Operation(summary = "Get course by id")
    @GetMapping("/{id}")
    CourseDto getCourseById(@PathVariable Long id) {
        return courseService.findCourseById(id);
    }

    @Operation(summary = "Delete course")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    DeleteDto deleteCourse(@PathVariable Long id) {
        return courseService.deleteCourse(id);
    }

}
