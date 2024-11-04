package cu.theater.backend.controller;

import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.dto.course.CreateCourseRequestDto;
import cu.theater.backend.dto.course.DeleteDto;
import cu.theater.backend.dto.course.UpdateCourseDto;
import cu.theater.backend.model.User;
import cu.theater.backend.service.course.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @DeleteMapping("/{courseId}/users/{userId}")
    public ResponseEntity<String> unsignUserFromCourse(@PathVariable Long courseId,
                                                       @PathVariable Long userId) {
        try {
            courseService.unsignUserFromCourse(courseId, userId);
            return ResponseEntity.ok("User with ID " + userId
                    + " was successfully unsigned from course with ID " + courseId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error unsigning user from course: " + e.getMessage());
        }
    }

    @PostMapping("/{courseId}/images")
    public CourseDto addCourseImages(
            @PathVariable Long courseId,
            @RequestParam("files") MultipartFile imageFile) {
        CourseDto updatedCourse;
        try {
            updatedCourse = courseService.addCourseImages(courseId,
                     imageFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return updatedCourse;
    }

    @DeleteMapping("/{courseId}/images/{imagePath}")
    public ResponseEntity<String> deleteCourseImage(@PathVariable Long courseId,
                                                    @PathVariable String imagePath) {
        courseService.deleteCourseImage(courseId, imagePath);
        return ResponseEntity.ok("Image deleted successfully");
    }

}
