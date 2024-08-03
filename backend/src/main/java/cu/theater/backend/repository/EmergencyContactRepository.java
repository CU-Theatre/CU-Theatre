package cu.theater.backend.repository;

import cu.theater.backend.model.EmergencyContact;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
    Optional<EmergencyContact> findByUserId(Long userId);
}
