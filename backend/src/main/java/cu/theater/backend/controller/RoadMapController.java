package cu.theater.backend.controller;

import cu.theater.backend.dto.roadmap.CreateRoadMapDto;
import cu.theater.backend.dto.roadmap.RoadMapDto;
import cu.theater.backend.service.roadmap.RoadMapService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/roadmaps")
public class RoadMapController {

    private final RoadMapService roadMapService;

    @PostMapping("/add")
    public RoadMapDto addRoadMapToCourse(@RequestBody CreateRoadMapDto requestDto) {
        return roadMapService.create(requestDto);
    }

    @PutMapping("/update/{id}")
    public RoadMapDto updateRoadMap(@RequestBody CreateRoadMapDto requestDto,
                                    @PathVariable Long id) {
        return roadMapService.update(id, requestDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRoadMap(@PathVariable Long id) {
        roadMapService.delete(id);
    }

    @GetMapping("/getAll")
    public List<RoadMapDto> getRoadMapById(@RequestParam Long id) {
        return roadMapService.findAllByCourseId(id);
    }

}
