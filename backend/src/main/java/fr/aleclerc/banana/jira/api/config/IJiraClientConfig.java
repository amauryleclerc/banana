package fr.aleclerc.banana.jira.api.config;

import java.util.Map;

public interface IJiraClientConfig {

	String getUser();
	
	String getPassword();
	
	String getUrl();

	Map<String,String> getCustomFields();

	Map<String,String> getTypes();

}
