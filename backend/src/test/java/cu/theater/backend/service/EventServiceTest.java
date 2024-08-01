package cu.theater.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import cu.theater.backend.dto.event.EventRequestDto;
import cu.theater.backend.dto.event.EventResponseDto;
import cu.theater.backend.mapper.EventMapper;
import cu.theater.backend.model.Event;
import cu.theater.backend.repository.EventRepository;
import cu.theater.backend.service.event.EventServiceImpl;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {
    @Mock
    private EventRepository eventRepository;

    @Mock
    private EventMapper eventMapper;

    @InjectMocks
    private EventServiceImpl eventService;

    @Test
    @DisplayName("Should create an event and "
            + "return the event response DTO when a valid request is provided")
    public void createEvent_ValidRequest_Ok() {
        //Given
        Event event = createEvent();
        EventResponseDto eventResponse = createEventResponse();
        EventRequestDto eventRequestDto = createDefaultEventRequestDto(event);

        when(eventMapper.toModel(eventRequestDto)).thenReturn(event);
        when(eventRepository.save(event)).thenReturn(event);
        when(eventMapper.toDto(event)).thenReturn(eventResponse);

        //When
        EventResponseDto eventResponseDto = eventService.add(eventRequestDto);

        //Then
        assertThat(eventResponseDto).isEqualTo(eventResponse);
        verify(eventMapper).toModel(eventRequestDto);
        verify(eventRepository).save(event);
        verify(eventMapper).toDto(event);
        verify(eventRepository, times(1)).save(event);
        verifyNoMoreInteractions(eventRepository, eventMapper);
    }

    @Test
    @DisplayName("Should throw exception when event cannot be saved")
    public void createEvent_InvalidRequest_NotOk() {
        //Given
        EventRequestDto invalidRequestDto =
                createDefaultEventRequestDto(createEvent());
        invalidRequestDto.setStatus(null);

        //When
        when(eventMapper.toModel(invalidRequestDto))
                .thenThrow(new RuntimeException("Validation failed"));

        //Then
        assertThrows(RuntimeException.class, () -> eventService.add(invalidRequestDto));
    }

    @Test
    @DisplayName("Should update an event and "
            + "return the event response DTO when a valid request is provided")
    public void updateEvent_validRequest_Ok() {
        //Given
        Long id = 1L;
        Event event = createEvent();
        EventResponseDto eventResponse = createEventResponse();
        eventResponse.setName("Test Event - UPD");
        EventRequestDto eventRequestDto = createDefaultEventRequestDto(event);
        eventRequestDto.setName("Test Event - UPD");

        when(eventRepository.findById(id)).thenReturn(Optional.of(event));
        when(eventMapper.toModel(eventRequestDto)).thenReturn(event);
        when(eventRepository.save(event)).thenReturn(event);
        when(eventMapper.toDto(event)).thenReturn(eventResponse);

        //When
        EventResponseDto eventUpdateResponseDto = eventService.update(id, eventRequestDto);

        //Then
        assertThat(eventUpdateResponseDto.getName()).isEqualTo(eventResponse.getName());
        verify(eventRepository).findById(id);
        verify(eventMapper).toModel(eventRequestDto);
        verify(eventRepository).save(event);
        verify(eventMapper).toDto(event);
        verifyNoMoreInteractions(eventRepository, eventMapper);
    }

    @Test
    @DisplayName("Should throw exception when event cannot be updated")
    public void updateEvent_InvalidRequest_NotOk() {
        //Given
        Long id = 1L;
        EventRequestDto invalidRequestDto =
                createDefaultEventRequestDto(createEvent());
        invalidRequestDto.setName("");

        //Then
        assertThrows(RuntimeException.class, () -> eventService.update(id, invalidRequestDto));
    }

    @Test
    @DisplayName("Should return a list of existing events from DB")
    public void getAllEvents_Ok() {
        // Given
        Event event1 = createEvent();
        Event event2 = createEvent();
        EventResponseDto eventResponse1 = createEventResponse();
        EventResponseDto eventResponse2 = createEventResponse();

        when(eventRepository.findAll()).thenReturn(List.of(event1, event2));
        when(eventMapper.toDto(event1)).thenReturn(eventResponse1);
        when(eventMapper.toDto(event2)).thenReturn(eventResponse2);

        // When
        List<EventResponseDto> eventResponseDtoList = eventService.getAll();

        // Then
        assertThat(eventResponseDtoList).containsExactly(eventResponse1, eventResponse2);
        verify(eventRepository).findAll();
        verifyNoMoreInteractions(eventRepository, eventMapper);
    }

    @Test
    @DisplayName("Should return event response DTO when a valid ID is provided")
    public void getById_ValidId_Ok() {
        //Given
        Long id = 1L;
        Event event = createEvent();
        EventResponseDto eventResponse = createEventResponse();

        when(eventRepository.findById(id)).thenReturn(Optional.of(event));
        when(eventMapper.toDto(event)).thenReturn(eventResponse);

        //When
        EventResponseDto result = eventService.getById(id);

        //Then
        assertThat(result).isEqualTo(eventResponse);
        verify(eventRepository).findById(id);
        verify(eventMapper).toDto(event);
        verifyNoMoreInteractions(eventRepository, eventMapper);
    }

    @Test
    @DisplayName("Should throw EntityNotFoundException when ID does not exist")
    public void getById_InvalidId_ThrowsException() {
        //Given
        Long id = 1L;

        when(eventRepository.findById(id)).thenReturn(Optional.empty());

        //Then
        assertThrows(cu.theater.backend.exception.EntityNotFoundException.class,
                () -> eventService.getById(id));
        verify(eventRepository).findById(id);
        verifyNoMoreInteractions(eventRepository);
    }

    @Test
    @DisplayName("Should delete event by ID when a valid ID is provided")
    public void delete_ValidId_Ok() {
        //Given
        Long id = 1L;
        Event event = createEvent();

        when(eventRepository.findById(id)).thenReturn(Optional.of(event));

        //When
        eventService.delete(id);

        //Then
        verify(eventRepository).findById(id);
        verify(eventRepository).deleteById(id);
        verifyNoMoreInteractions(eventRepository);
    }

    @Test
    @DisplayName("Should throw EntityNotFoundException when deleting a non-existent event")
    public void delete_InvalidId_ThrowsException() {
        //Given
        Long id = 1L;

        when(eventRepository.findById(id)).thenReturn(Optional.empty());

        //Then
        assertThrows(cu.theater.backend.exception.EntityNotFoundException.class,
                () -> eventService.delete(id));
        verify(eventRepository).findById(id);
        verifyNoMoreInteractions(eventRepository);
    }

    private Event createEvent() {
        Event event = new Event();
        event.setId(1L);
        event.setName("Test Event");
        event.setDescription("Test Description");
        event.setPrice(BigDecimal.valueOf(100));
        event.setStatus(Event.Status.ONGOING);
        event.setPhotoUrl("Test Photo");
        event.setDeleted(false);
        return event;
    }

    private EventResponseDto createEventResponse() {
        return new EventResponseDto()
                .setId(1L)
                .setName("Test Event")
                .setDescription("Test Description")
                .setPrice(BigDecimal.valueOf(100))
                .setStatus(Event.Status.ONGOING)
                .setPhotoUrl("Test Photo");
    }

    private EventRequestDto createDefaultEventRequestDto(Event event) {
        return new EventRequestDto()
                .setName(event.getName())
                .setDescription(event.getDescription())
                .setPrice(event.getPrice())
                .setStatus(event.getStatus())
                .setPhotoUrl(event.getPhotoUrl());
    }
}
