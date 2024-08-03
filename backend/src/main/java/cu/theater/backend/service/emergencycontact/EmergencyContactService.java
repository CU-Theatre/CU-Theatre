package cu.theater.backend.service.emergencycontact;

import cu.theater.backend.dto.emergencycontact.CreateEmergencyContactDto;
import cu.theater.backend.dto.emergencycontact.EmergencyContactDto;
import cu.theater.backend.dto.emergencycontact.UpdateEmergencyContactDto;

public interface EmergencyContactService {
    EmergencyContactDto addEmergencyContact(CreateEmergencyContactDto createEmergencyContactDto);

    EmergencyContactDto getEmergencyContact(Long userId);

    EmergencyContactDto updateEmergencyContact(UpdateEmergencyContactDto emergencyContactDto);

    void deleteEmergencyContact(Long id);
}
