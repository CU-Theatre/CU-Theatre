package cu.theater.backend.controller;

import cu.theater.backend.service.filedata.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file-data-test")
@CrossOrigin
@RequiredArgsConstructor
public class FileDataController {

    private final FileStorageService fileDataService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category,
            @RequestParam("isVideo") boolean isVideo,
            @RequestParam("relatedId") Long relatedId) {

        try {
            String fileName = fileDataService.saveFile(file, category, isVideo, relatedId);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("File uploaded successfully: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/download/{category}/{mediaType}/{fileName}")
    public ResponseEntity<?> downloadFile(
            @PathVariable String category,
            @PathVariable String mediaType,
            @PathVariable String fileName) {

        try {
            // Construct the relative path for the file
            String relativePath = String.join("/", mediaType, category, fileName);
            byte[] fileData = fileDataService.downloadFile(relativePath);

            // Detect MediaType based on the file extension
            MediaType detectedMediaType = determineMediaType(fileName);

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(detectedMediaType)
                    .body(fileData);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File not found: " + e.getMessage());
        }
    }

    private MediaType determineMediaType(String fileName) {
        if (fileName.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else if (fileName.endsWith(".mp4")) {
            return MediaType.valueOf("video/mp4");
        } else if (fileName.endsWith(".mov")) {
            return MediaType.valueOf("video/quicktime");
        }
        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
