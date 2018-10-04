package and.digital.casestudy.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import and.digital.casestudy.models.CaseStudy;

@RepositoryRestResource
public interface CaseStudyRepository extends MongoRepository<CaseStudy, Long> {

	@Query("{ 'tags' : { $regex: ?0 } }")
	public List<CaseStudy> findByTags(String tags);

	@Query("{ 'clientName' : { $regex: ?0 } }")
	public List<CaseStudy> findByClientName(String clientName);
	
	@Query("{ 'name' : { $regex: ?0 } }")
	public List<CaseStudy> findByName(String name);
	
	@Query("{ 'description' : { $regex: ?0 } }")
	public List<CaseStudy> findAny(String name);

}
