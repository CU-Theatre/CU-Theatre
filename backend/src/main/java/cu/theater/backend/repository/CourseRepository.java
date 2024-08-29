package cu.theater.backend.repository;

import cu.theater.backend.model.Course;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByUsersId(Long userId);
}
