package fr.aleclerc.banana.config;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import fr.aleclerc.banana.domain.plush.IPlushConfig;
import fr.aleclerc.banana.domain.plush.Plush;
import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;

public class BananaConfig implements IPlushConfig, IJiraClientConfig {

	private String jiraUser;
	private String jiraPassword;
	private String jiraUrl;
	private List<Plush> plushs;

	
	@JsonCreator
	public BananaConfig(@JsonProperty("jiraUser") String jiraUser,@JsonProperty("jiraPassword")  String jiraPassword, @JsonProperty("jiraUrl") String jiraUrl,@JsonProperty("plushs")  List<Plush> plushs) {
		super();
		this.jiraUser = jiraUser;
		this.jiraPassword = jiraPassword;
		this.jiraUrl = jiraUrl;
		this.plushs = plushs;
	}

	@Override
	public String getUser() {
		return jiraUser;
	}

	@Override
	public String getPassword() {
		return jiraPassword;
	}

	@Override
	public String getUrl() {
		return jiraUrl;
	}

	@Override
	public List<Plush> getPlushs() {
		return plushs;
	}

}