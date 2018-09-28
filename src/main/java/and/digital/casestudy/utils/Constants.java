package and.digital.casestudy.utils;

public class Constants {
	
	public final static String GET_CASE_STUDY_BY_NAME = "SELECT * FROM case_study  WHERE name = :name";
	
	public final static String GET_CASE_STUDY_BY_TAGS = "SELECT * FROM case_study  WHERE tags = :tags";
	
	public final static String GET_CASE_STUDY_BY_CLIENT_NAME = "SELECT * FROM case_study  WHERE clientName = :clientName";
	
	public final static String HOME_URL = "/api/v1/casestudy";
	
	public final static String CASE_STUDY_BY_ID_URL = "/{id}";
	
	public final static String QUERY_BY_URL = "/{queryType}/{queryValue}";
	
	public final static String PDF_URL = "/convertToPdf";
}