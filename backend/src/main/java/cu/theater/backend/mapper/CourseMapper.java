package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.course.CourseDto;
import cu.theater.backend.model.Course;
import cu.theater.backend.model.CourseImage;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

@Mapper(config = MapperConfig.class)
@Component
public interface CourseMapper {
    @Mapping(source = "images", target = "images", qualifiedByName = "imagesToImagePaths")
    CourseDto toDto(Course course);

    @Mapping(source = "images", target = "images", qualifiedByName = "imagePathsToImages")
    Course toModel(CourseDto courseDto);

    // Custom method to convert List<CourseImage> to List<String>
    @Named("imagesToImagePaths")
    default List<String> imagesToImagePaths(List<CourseImage> images) {
        return images.stream()
                .map(CourseImage::getImagePath)
                .collect(Collectors.toList());
    }

    // Custom method to convert List<String> to List<CourseImage>
    @Named("imagePathsToImages")
    default List<CourseImage> imagePathsToImages(List<String> imagePaths) {
        return imagePaths.stream()
                .map(path -> {
                    CourseImage courseImage = new CourseImage();
                    courseImage.setImagePath(path);
                    return courseImage;
                })
                .collect(Collectors.toList());
    }
}
