package cu.theater.backend.repository;

import cu.theater.backend.model.CourseEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseEventRepository extends JpaRepository<CourseEvent, Long> {
}
