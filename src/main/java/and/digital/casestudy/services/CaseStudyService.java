package and.digital.casestudy.services;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import and.digital.casestudy.exception.CaseStudyException;
import and.digital.casestudy.models.CaseStudy;
import and.digital.casestudy.repositories.CaseStudyRepository;
import and.digital.casestudy.utils.Constants;
import and.digital.casestudy.utils.ConvertToPdfUtil;

@Service
public class CaseStudyService {
	
	private String regexBegin = "(?i).*";
	private String regexEnd = ".*";
	
	Logger logger = LoggerFactory.getLogger(CaseStudyService.class);
	
	@Autowired
	private CaseStudyRepository caseStudyRepository;
	
	public List<CaseStudy> getAllCaseStudys() {
		logger.info("Fetching all the casestudies ");
		return caseStudyRepository.findAll();
	}

	public void saveCaseStudy(@RequestBody CaseStudy caseStudy) {
		logger.info("Creating a new case study with id ");
		caseStudy.setId(UUID.randomUUID());
		caseStudyRepository.save(caseStudy);
	}
	
	@GetMapping(Constants.QUERY_BY_URL)
	public List<CaseStudy> getSearchData(@PathVariable(Constants.QUERY_TYPE) String queryType,
			@PathVariable(Constants.QUERY_VALUE) String queryValue) {

		List<CaseStudy> casestudys;
		logger.info("Searching case studys with queryType as " + queryType + " queryValue as " + queryValue);

		if (queryType.equals(Constants.NAME)) {
			casestudys = getCaseStudyByName(queryValue);
		} else if (queryType.equals(Constants.TAGS)) {
			casestudys = getCaseStudyByTags(queryValue);
		} else if (queryType.equals(Constants.CLIENT_NAME)) {
			casestudys = getCaseStudyByClientName(queryValue);
		} else {
			logger.error("Error occured due to wrong queryType {}" + queryType);
			throw new CaseStudyException(Constants.WRONG_QUERY_TYPE);
		}
		if (casestudys.size() == 0) {
			logger.error("No case study for {} " + queryValue + " found");
			throw new CaseStudyException(Constants.NO_CASE_STUDY_FOUND);
		}
		return casestudys;
	}

	public void createPDF(@RequestBody List<CaseStudy> casestudys) {
		if (casestudys.size() == 0) {
			logger.error("Need to have case studys to generate the PDF");
			throw new CaseStudyException(Constants.NO_CASE_STUDY_FOUND);
		}
		logger.info("Creating a PDF ");
		ConvertToPdfUtil.convertToPdf(casestudys);
	}

	public List<CaseStudy> getCaseStudyByName(String name) {
		return caseStudyRepository.findByName(regexBegin + name + regexEnd);
	}

	public List<CaseStudy> getCaseStudyByTags(String tags) {
		return caseStudyRepository.findByTags(regexBegin + tags + regexEnd);
	}

	public List<CaseStudy> getCaseStudyByClientName(String clientName) {
		return caseStudyRepository.findByClientName(regexBegin + clientName + regexEnd);
	}

	public void deleteCaseStudy() {
		caseStudyRepository.deleteAll();
	}

	public void deleteCaseStudy(CaseStudy casestudy) {
		caseStudyRepository.delete(casestudy);
	}

	public List<CaseStudy> getSearchAnyData(String queryValue) {
		return caseStudyRepository.findAny(regexBegin + queryValue + regexEnd);
	}

}
