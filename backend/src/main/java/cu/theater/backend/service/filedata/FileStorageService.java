package cu.theater.backend.service.filedata;

import cu.theater.backend.model.FileData;
import cu.theater.backend.repository.FileDataRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    @Value("${file.storage.base-directory}")
    private String baseDirectory;

    private final FileDataRepository fileDataRepository;

    public FileStorageService(FileDataRepository fileDataRepository) {
        this.fileDataRepository = fileDataRepository;
    }

    public String saveFile(MultipartFile file,
                           String category, boolean isVideo, Long relatedId) throws IOException {
        if (file.isEmpty() || relatedId == null || category == null) {
            throw new IllegalArgumentException("Invalid file or parameters");
        }

        String mediaType = isVideo ? "videos" : "photos";

        // Generate directory path and ensure it exists
        Path storageDirectory = Paths.get(baseDirectory, mediaType, category);
        if (Files.notExists(storageDirectory)) {
            Files.createDirectories(storageDirectory);
        }

        // Generate a unique filename with the related ID
        String originalFilename = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        String uniqueFilename = String.format("%d_%s%s", relatedId, UUID.randomUUID(),
                fileExtension.isEmpty() ? "" : "." + fileExtension);

        // Define target path and save the file
        Path targetPath = storageDirectory.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        // Save metadata to database
        FileData fileData = new FileData();
        fileData.setName(uniqueFilename);
        fileData.setFilePath(targetPath.toString());
        fileData.setType(fileExtension);
        fileData.setVideo(isVideo);
        fileDataRepository.save(fileData);

        // Return the relative path for easy retrieval
        return Paths.get(mediaType, category, uniqueFilename).toString();
    }

    public byte[] downloadFile(String relativePath) {
        try {
            // Construct full path from base directory and relative path
            Path filePath = Paths.get(baseDirectory, relativePath);
            if (Files.exists(filePath)) {
                return Files.readAllBytes(filePath);
            } else {
                throw new RuntimeException("File not found: " + relativePath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading file: " + relativePath, e);
        }
    }

    @Transactional
    public void deleteFile(String imagePath) {

        Path filePath = Paths.get(imagePath);

        // Ensure the path exists under the base directory for safety
        if (!filePath.startsWith(baseDirectory)) {
            filePath = Paths.get(baseDirectory).resolve(imagePath).normalize();
        }

        try {
            Files.deleteIfExists(filePath);
            fileDataRepository.deleteByName(filePath.getFileName().toString());
        } catch (IOException e) {
            throw new RuntimeException("Error deleting file: " + imagePath, e);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) {
            return "";
        }
        int lastDot = filename.lastIndexOf('.');
        return (lastDot == -1) ? "" : filename.substring(lastDot + 1);
    }
}
