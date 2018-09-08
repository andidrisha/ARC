package and.digital.casestudy.utils;

public class Constants {
	
	public final static String GET_CASE_STUDY_BY_NAME = "SELECT * FROM case_study  WHERE name = :name";
	
	public final static String GET_CASE_STUDY_BY_TAGS = "SELECT * FROM case_study  WHERE tags = :tags";
	
	public final static String GET_CASE_STUDY_BY_CLIENT_NAME = "SELECT * FROM case_study  WHERE clientName = :clientName";

}
