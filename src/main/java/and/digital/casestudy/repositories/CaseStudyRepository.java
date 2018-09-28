package and.digital.casestudy.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import and.digital.casestudy.models.CaseStudy;

@RepositoryRestResource
public interface CaseStudyRepository extends MongoRepository<CaseStudy, Long> {

	public List<CaseStudy> findByName(@Param("name") String name);

	public List<CaseStudy> findByTags(@Param("tags") String tags);

	public List<CaseStudy> findByClientName(@Param("clientName") String clientName);

}
