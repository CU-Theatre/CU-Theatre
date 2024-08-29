package cu.theater.backend.model;

import static org.hibernate.type.SqlTypes.TINYINT;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Setter
@Table(name = "courses")
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = "UPDATE courses SET is_deleted = TRUE WHERE id = ?")
@Where(clause = "is_deleted = FALSE")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "course_name")
    private String name;
    @Column(nullable = false, name = "description")
    private String description;
    @Column(nullable = false, name = "image")
    private String image;
    @Column(nullable = false, name = "start_date")
    private LocalDateTime startDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_courses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<User> users = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @JdbcTypeCode(TINYINT)
    @Column(nullable = false)
    private boolean isDeleted = false;

}