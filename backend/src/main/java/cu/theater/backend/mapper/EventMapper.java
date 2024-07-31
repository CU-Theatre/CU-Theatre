package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.event.EventRequestDto;
import cu.theater.backend.dto.event.EventResponseDto;
import cu.theater.backend.model.Event;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface EventMapper {
    Event toModel(EventRequestDto registrationRequestDto);

    EventResponseDto toDto(Event event);
}
