package cu.theater.backend.service.emergencycontact;

import cu.theater.backend.dto.emergencycontact.CreateEmergencyContactDto;
import cu.theater.backend.dto.emergencycontact.EmergencyContactDto;
import cu.theater.backend.dto.emergencycontact.UpdateEmergencyContactDto;
import cu.theater.backend.exception.EntityNotFoundException;
import cu.theater.backend.mapper.EmergencyContactMapper;
import cu.theater.backend.model.EmergencyContact;
import cu.theater.backend.model.User;
import cu.theater.backend.repository.EmergencyContactRepository;
import cu.theater.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EmergencyContactServiceImpl implements EmergencyContactService {
    private final EmergencyContactRepository emergencyContactRepository;
    private final UserRepository userRepository;
    private final EmergencyContactMapper emergencyContactMapper;

    @Override
    public EmergencyContactDto addEmergencyContact(
            CreateEmergencyContactDto createEmergencyContactDto) {
        EmergencyContact emergencyContact =
                getEmergencyContactByUserId(createEmergencyContactDto.userId());
        emergencyContact.setFirstName(createEmergencyContactDto.firstName());
        emergencyContact.setLastName(createEmergencyContactDto.lastName());
        emergencyContact.setPhoneNumber(createEmergencyContactDto.phoneNumber());
        emergencyContact.setRelation(createEmergencyContactDto.relation());
        emergencyContact = emergencyContactRepository.save(emergencyContact);
        return emergencyContactMapper.toDto(emergencyContact);
    }

    @Override
    public EmergencyContactDto getEmergencyContact(Long userId) {
        EmergencyContact emergencyContact = getEmergencyContactByUserId(userId);
        return emergencyContactMapper.toDto(emergencyContact);
    }

    @Override
    public EmergencyContactDto updateEmergencyContact(
            UpdateEmergencyContactDto emergencyContactDto) {
        EmergencyContact emergencyContact =
                emergencyContactRepository.findById(emergencyContactDto.id())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Can't find emergency contact with id:" + emergencyContactDto.id()));
        emergencyContact.setFirstName(emergencyContactDto.firstName());
        emergencyContact.setLastName(emergencyContactDto.lastName());
        emergencyContact.setPhoneNumber(emergencyContactDto.phoneNumber());
        emergencyContact.setRelation(emergencyContactDto.relation());
        emergencyContact = emergencyContactRepository.save(emergencyContact);
        return emergencyContactMapper.toDto(emergencyContact);
    }

    @Override
    public void deleteEmergencyContact(Long id) {
        emergencyContactRepository.deleteById(id);
    }

    private EmergencyContact getEmergencyContactByUserId(Long id) {
        return emergencyContactRepository.findByUserId(id)
                .orElseGet(() -> {
                    User user = userRepository.findById(id)
                            .orElseThrow(() -> new EntityNotFoundException(
                                    "Can't find user with id:" + id));
                    EmergencyContact emergencyContact = new EmergencyContact();
                    emergencyContact.setUser(user);
                    return emergencyContact;
                });
    }
}
