package cu.theater.backend.repository;

import cu.theater.backend.model.RoadMap;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadMapRepository extends JpaRepository<RoadMap, Long> {

    Optional<RoadMap> findByCourseId(Long courseId);

    List<RoadMap> findAllByCourseId(Long courseId);
}
