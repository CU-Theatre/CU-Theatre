package cu.theater.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "course_event")
@AllArgsConstructor
@NoArgsConstructor
public class CourseEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime start;

    @Column(nullable = false)
    private LocalDateTime end;

    private String description;
    private String icon;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    @Column(nullable = false)
    private String freq;
    @Column(nullable = false, name = "step")
    private Integer step;

    @Column(name = "days")
    private String daysString;

    @Transient
    private List<Days> days;

    @PrePersist
    @PreUpdate
    private void convertDaysToString() {
        if (days != null) {
            this.daysString = days.stream()
                    .map(Enum::name)
                    .collect(Collectors.joining(","));
        }
    }

    @PostLoad
    private void convertStringToDays() {
        if (daysString != null && !daysString.isEmpty()) {
            this.days = Arrays.stream(daysString.split(","))
                    .map(Days::valueOf)
                    .collect(Collectors.toList());
        }
    }
}
