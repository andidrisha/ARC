package and.digital.casestudy.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import and.digital.casestudy.models.CaseStudy;
import and.digital.casestudy.utils.Constants;

public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long>, JpaSpecificationExecutor<CaseStudy> {

	@Query(value = Constants.GET_CASE_STUDY_BY_NAME, nativeQuery = true)
	public List<CaseStudy> findByName(@Param("name") String name);

	@Query(value = Constants.GET_CASE_STUDY_BY_TAGS, nativeQuery = true)
	public List<CaseStudy> findByTags(@Param("tags") String tags);

	@Query(value = Constants.GET_CASE_STUDY_BY_CLIENT_NAME, nativeQuery = true)
	public List<CaseStudy> findByClientName(@Param("clientName") String clientName);

}
