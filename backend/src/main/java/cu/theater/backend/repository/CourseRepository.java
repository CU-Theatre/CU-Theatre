package cu.theater.backend.repository;

import cu.theater.backend.model.Course;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByUsersId(Long userId);

    @Query("SELECT c.user FROM UserCourses c WHERE c.id = :courseId")
    Set<Long> findUsersByCourseId(@Param("courseId") Long courseId);
}
