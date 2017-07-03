package fr.aleclerc.banana.jira.app.config;

import org.springframework.context.annotation.Configuration;

import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;

@Configuration
public class JiraClientConfig implements IJiraClientConfig {

	@Override
	public String getUser() {
		return "amauryleclerc@hotmail.fr";
	}

	@Override
	public String getPassword() {
		return "jupiter44";
	}

	@Override
	public String getUrl() {
		return "http://localhost:8080";
	}

}
