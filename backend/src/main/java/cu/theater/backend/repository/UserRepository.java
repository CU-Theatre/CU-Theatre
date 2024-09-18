package cu.theater.backend.repository;

import cu.theater.backend.model.Course;
import cu.theater.backend.model.User;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u.courses FROM User u WHERE u.id = :userId")
    Set<Course> findCoursesByUserId(@Param("userId") Long userId);

    @Query("SELECT u FROM User u WHERE u.id = :id AND u.dramaCourseFinished = true")
    Optional<User> findByIdWhereDramaCourseIsFinished(Long id);

}
