package cu.theater.backend.service.event;

import cu.theater.backend.dto.event.EventRequestDto;
import cu.theater.backend.dto.event.EventResponseDto;
import java.util.List;

public interface EventService {
    EventResponseDto add(EventRequestDto requestDto);

    EventResponseDto update(Long id, EventRequestDto requestDto);

    List<EventResponseDto> getAll();

    EventResponseDto getById(Long id);

    void delete(Long id);
}
