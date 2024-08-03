package cu.theater.backend.model;

import static org.hibernate.type.SqlTypes.TINYINT;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Data
@Table(name = "events")
@SQLDelete(sql = "UPDATE events SET is_deleted = true WHERE id=?")
@SQLRestriction("is_deleted=false")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "name")
    private String name;

    @Column(nullable = false, name = "description")
    private String description;

    @Column(nullable = false, name = "price")
    private BigDecimal price;

    @Column(nullable = false, name = "photo_url")
    private String photoUrl;

    @Column(nullable = false, name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @JdbcTypeCode(TINYINT)
    @Column(nullable = false, name = "is_deleted")
    private boolean isDeleted;

    public enum Status {
        EARLY_BIRD,
        SCHEDULED,
        RESCHEDULED,
        ONGOING,
        COMPLETED,
        CANCELED
    }
}
