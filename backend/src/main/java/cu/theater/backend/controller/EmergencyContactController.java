package cu.theater.backend.controller;

import cu.theater.backend.dto.emergencycontact.CreateEmergencyContactDto;
import cu.theater.backend.dto.emergencycontact.EmergencyContactDto;
import cu.theater.backend.dto.emergencycontact.UpdateEmergencyContactDto;
import cu.theater.backend.service.emergencycontact.EmergencyContactService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/emergency-contact")
public class EmergencyContactController {
    private final EmergencyContactService emergencyContactService;

    @Operation(summary = "add emergency contact ",
            description = "add emergency contact to user")
    @PostMapping("/add")
    public EmergencyContactDto addEmergencyContactToUser(@RequestBody
            CreateEmergencyContactDto requestDto) {
        return emergencyContactService.addEmergencyContact(requestDto);
    }

    @Operation(summary = "get emergency contact ",
            description = "get emergency contact of user")
    @GetMapping("/get")
    public EmergencyContactDto getEmergencyContactOfUser(@RequestBody
            Long userId) {
        return emergencyContactService.getEmergencyContact(userId);
    }

    @Operation(summary = "update emergency contact ",
            description = "update emergency contact of user")
    @PutMapping("/update")
    public EmergencyContactDto updateEmergencyContactOfUser(@RequestBody
            UpdateEmergencyContactDto requestDto) {
        return emergencyContactService.updateEmergencyContact(requestDto);
    }

    @Operation(summary = "delete emergency contact ",
            description = "delete emergency contact of user")
    @DeleteMapping("/delete")
    public void deleteEmergencyContactOfUser(@RequestBody
            Long id) {
        emergencyContactService.deleteEmergencyContact(id);
    }
}
