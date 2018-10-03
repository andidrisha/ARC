package and.digital.casestudy.models;


import java.util.UUID;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CaseStudy {
	
	@Id
	private UUID id;
	
	private String name;
	private String description;
	private String tags;
	private String summary;
	private String clientName;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getClientName() {
		return clientName;
	}
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
}
