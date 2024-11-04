package cu.theater.backend.repository;

import cu.theater.backend.model.FileData;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileDataRepository extends JpaRepository<FileData, Long> {
    Optional<FileData> findByName(String fileName);

    void deleteByName(String fileName);

    boolean existsByName(String fileName);
}
