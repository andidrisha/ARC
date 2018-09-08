package and.digital.casestudy.models;

public enum QueryType {
NAME("name"), TAGS("tags"), CLIENTNAME("clientName");
	private String type;
	
	QueryType(String type)
	{
		this.type = type;
	}

}
