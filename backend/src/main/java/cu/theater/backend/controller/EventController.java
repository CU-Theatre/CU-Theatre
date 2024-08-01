package cu.theater.backend.controller;

import cu.theater.backend.dto.event.EventRequestDto;
import cu.theater.backend.dto.event.EventResponseDto;
import cu.theater.backend.service.event.EventService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/events")
@CacheConfig(cacheNames = {"eventResponse"})
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventResponseDto createEvent(@RequestBody @Valid EventRequestDto client) {
        return eventService.add(client);
    }

    @PutMapping("/{id}")
    @CachePut(key = "#id")
    public EventResponseDto updateEvent(@PathVariable Long id,
                                        @Valid @RequestBody EventRequestDto request) {
        return eventService.update(id, request);
    }

    @GetMapping
    @Cacheable(key = "'allEvents'")
    public List<EventResponseDto> getAllEvents() {
        return eventService.getAll();
    }

    @GetMapping("/{id}")
    @Cacheable(key = "#id")
    public EventResponseDto getEventById(@PathVariable Long id) {
        return eventService.getById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @CacheEvict(key = "#id", beforeInvocation = true)
    public void deleteEvent(@PathVariable Long id) {
        eventService.delete(id);
    }
}
