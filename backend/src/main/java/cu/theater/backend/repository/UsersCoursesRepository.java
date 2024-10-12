package cu.theater.backend.repository;

import cu.theater.backend.model.Course;
import cu.theater.backend.model.UserCourses;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsersCoursesRepository extends JpaRepository<UserCourses, Long> {

    @Query("SELECT uc.user.id FROM UserCourses uc WHERE uc.course.id = :courseId")
    Set<Long> findUserIdsByCourseId(@Param("courseId") Long courseId);

    @Query("SELECT uc.course FROM UserCourses uc WHERE uc.user.id = :userId")
    List<Course> findAllByUsersId(Long userId);

    @Query("SELECT uc.course.id FROM UserCourses uc WHERE uc.user.id = :userId")
    Set<Long> findCourseIdsByUserId(@Param("userId") Long userId);

}
