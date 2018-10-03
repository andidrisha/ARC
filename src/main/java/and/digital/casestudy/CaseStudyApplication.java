package and.digital.casestudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import com.amazonaws.services.databasemigrationservice.model.MongoDbSettings;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import and.digital.casestudy.models.FileStorageProperties;


@SpringBootApplication
@EnableConfigurationProperties({ FileStorageProperties.class })
public class CaseStudyApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(CaseStudyApplication.class, args);
	}
}
