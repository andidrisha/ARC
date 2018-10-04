package and.digital.casestudy.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import and.digital.casestudy.exception.FileNotFoundException;
import and.digital.casestudy.exception.FileStorageException;
import and.digital.casestudy.models.CaseStudy;
import and.digital.casestudy.models.FileStorageProperties;
import and.digital.casestudy.repositories.CaseStudyRepository;
import and.digital.casestudy.utils.UploadPptUtil;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
	
	Logger logger = LoggerFactory.getLogger(FileStorageService.class);
	
	@Autowired
	private CaseStudyRepository caseStudyRepository;
	
	private final Path fileStorageLocation;

	@Autowired
	public FileStorageService(FileStorageProperties fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
		logger.info("In FileStorageService with file storage location as "+this.fileStorageLocation);

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			logger.error("Could not create the directory where the uploaded files will be stored. Exception : "+ex);
			throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
		}
	}

	public String storeFile(MultipartFile file, String name, String clientname, String tags) {
		logger.info("In storeFile with name " + name + " client name  " + clientname + " tags " + tags);
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				logger.error("Sorry! Filename contains invalid path sequence " + fileName);
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			// Start reading the PPTx file
			CaseStudy casestudy = UploadPptUtil.readPPTXFile(targetLocation.toString());
			casestudy.setClientName(clientname);
			casestudy.setName(name);
			casestudy.setTags(tags);
			casestudy.setId(UUID.randomUUID());
			caseStudyRepository.save(casestudy);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			logger.error("Could not store file " + fileName + ". Please try again!", ex);
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	public Resource loadFileAsResource(String fileName) {
		logger.info("In loadFileAsResource with fileName " + fileName );
		try {
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				logger.error("File not found " + fileName);
				throw new FileNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			logger.error("File not found " + fileName, ex);
			throw new FileNotFoundException("File not found " + fileName, ex);
		}
	}

}
