package cu.theater.backend.service.event;

import cu.theater.backend.dto.event.EventRequestDto;
import cu.theater.backend.dto.event.EventResponseDto;
import cu.theater.backend.mapper.EventMapper;
import cu.theater.backend.model.Event;
import cu.theater.backend.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    @Override
    public EventResponseDto add(EventRequestDto requestDto) {
        Event event = eventMapper.toModel(requestDto);
        return eventMapper.toDto(eventRepository.save(event));
    }

    @Override
    public EventResponseDto update(Long id, EventRequestDto requestDto) {
        System.out.println("DB Called!");
        eventRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Can't find event with id: " + id));
        Event event = eventMapper.toModel(requestDto);
        event.setId(id);
        return eventMapper.toDto(eventRepository.save(event));
    }

    @Override
    public List<EventResponseDto> getAll() {
        System.out.println("DB Called!");
        return eventRepository.findAll().stream()
                .map(eventMapper::toDto)
                .toList();
    }

    @Override
    public EventResponseDto getById(Long id) {
        System.out.println("DB Called!");
        return eventMapper.toDto(eventRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Can't find event with id: " + id)));
    }

    @Override
    public void delete(Long id) {
        getById(id);
        eventRepository.deleteById(id);
    }
}
