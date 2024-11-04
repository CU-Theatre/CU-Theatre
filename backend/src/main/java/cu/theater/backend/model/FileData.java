package cu.theater.backend.model;

import static org.hibernate.type.SqlTypes.TINYINT;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;

@Entity
@Table(name = "file_data")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    @Column(name = "file_path")
    private String filePath;

    @Column(name = "is_video")
    @JdbcTypeCode(TINYINT)
    private boolean isVideo;
}
