package and.digital.casestudy.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import and.digital.casestudy.models.CaseStudy;
import and.digital.casestudy.services.CaseStudyService;
import and.digital.casestudy.services.FileStorageService;
import and.digital.casestudy.utils.Constants;

@RestController
@RequestMapping(Constants.HOME_URL)
public class CaseStudyController {

	Logger logger = LoggerFactory.getLogger(CaseStudyController.class);

	@Autowired
	private FileStorageService fileStorageService;

	@Autowired
	private CaseStudyService caseStudyService;

	@PostMapping(value = Constants.UPLOAD_CASESTUDY)
	public UploadFileResponse uploadFile(@RequestPart("casestudy") MultipartFile file,
										 @RequestPart("casestudyname") String name, 
										 @RequestPart("clientname") String clientname,
										 @RequestPart("tags") String tags) {
		logger.info("Uploading case study with case study name as " + name + " client name as " + clientname + " tags as " + tags);
		String fileName = fileStorageService.storeFile(file,name, clientname, tags);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
	}

	@PostMapping(Constants.UPLOAD_MULTIPLE_CASESTUDY)
	public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		return null;
		// return Arrays.asList(files).stream().map(file ->
		// uploadFile(file)).collect(Collectors.toList());
	}

	@GetMapping
	public List<CaseStudy> getAllCaseStudys() {
		logger.info("Fetching all the casestudies ");
		return caseStudyService.getAllCaseStudys();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void create(@RequestBody CaseStudy caseStudy) {
		logger.info("Creating a new case study with id " + caseStudy.getId());
		caseStudyService.saveCaseStudy(caseStudy);
	}

	@GetMapping(Constants.QUERY_BY_URL)
	public List<CaseStudy> getSearchData(@PathVariable(Constants.QUERY_TYPE) String queryType,
			@PathVariable(Constants.QUERY_VALUE) String queryValue) {
		return caseStudyService.getSearchData(queryType, queryValue);
	}

	@PostMapping(value = Constants.PDF_URL, produces = { MediaType.APPLICATION_PDF_VALUE })
	public void createPDF(@RequestBody List<CaseStudy> casestudys) {
		caseStudyService.createPDF(casestudys);
	}
	
	@DeleteMapping(value = "deleteAllCasestudys")
	public void deleteAllCaseStudys() {
		caseStudyService.deleteCaseStudy();
	}
	
	@DeleteMapping(value = "deleteCasestudy")
	public void deleteCaseStudy(@RequestBody CaseStudy casestudys) {
		caseStudyService.deleteCaseStudy(casestudys);
	}
}
