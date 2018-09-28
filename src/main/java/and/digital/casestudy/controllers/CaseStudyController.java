package and.digital.casestudy.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import and.digital.casestudy.exception.CaseStudyException;
import and.digital.casestudy.models.CaseStudy;
import and.digital.casestudy.repositories.CaseStudyRepository;
import and.digital.casestudy.utils.ConvertToPdfUtil;
import and.digital.casestudy.utils.Constants;

@RestController
@RequestMapping(Constants.HOME_URL)
public class CaseStudyController {
	
	Logger logger = LoggerFactory.getLogger(CaseStudyController.class);

	@Autowired
	private CaseStudyRepository caseStudyRepository;

	@GetMapping
	public List<CaseStudy> list() {
		logger.info("Fetching all the casestudies ");
		return caseStudyRepository.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void create(@RequestBody CaseStudy caseStudy) {
		logger.info("Creating a new case study with id {}"+caseStudy.getId());
		caseStudyRepository.save(caseStudy);
	}

	@GetMapping(Constants.QUERY_BY_URL)
	public List<CaseStudy> getSearchData(@PathVariable("queryType")String queryType, @PathVariable("queryValue")String queryValue) {
		
		logger.info("Searching case studys whose {}" + queryType + "are {}" + queryValue);
		
		if(queryType.equals("name"))
		{
			return getCaseStudyByName(queryValue);
		}
		else if(queryType.equals("tags"))
		{
			return getCaseStudyByTags(queryValue);
		}
		else if(queryType.equals("clientname"))
		{
			return getCaseStudyByClientName(queryValue);
		}
		else
		{
			logger.error("Error occured due to wrong queryType {}" + queryType );
			throw new CaseStudyException("Wrong queryType");
		}
	}
	
	@PostMapping("/convertToPdf")
	public void createPDF(@RequestBody List<CaseStudy> casestudies) {
		logger.info("Creating a PDF ");
		ConvertToPdfUtil.convertToPdf(casestudies);
	}
	
	public List<CaseStudy> getCaseStudyByName(String name) {
		return caseStudyRepository.findByName(name);
	}
	
	public List<CaseStudy> getCaseStudyByTags(String tags) {
		return caseStudyRepository.findByTags(tags);
	}
	
	public List<CaseStudy> getCaseStudyByClientName(String clientName) {
		return caseStudyRepository.findByClientName(clientName);
	}
}
