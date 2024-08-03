package cu.theater.backend.mapper;

import cu.theater.backend.config.MapperConfig;
import cu.theater.backend.dto.emergencycontact.CreateEmergencyContactDto;
import cu.theater.backend.dto.emergencycontact.EmergencyContactDto;
import cu.theater.backend.model.EmergencyContact;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface EmergencyContactMapper {
    @Mapping(source = "user.id", target = "userId")
    EmergencyContactDto toDto(EmergencyContact emergencyContact);

    EmergencyContact toEntity(CreateEmergencyContactDto createEmergencyContactDto);
}
