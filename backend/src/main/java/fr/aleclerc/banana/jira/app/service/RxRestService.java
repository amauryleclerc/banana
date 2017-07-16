package fr.aleclerc.banana.jira.app.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.AsyncRestTemplate;

import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;
import fr.aleclerc.banana.jira.api.service.IRxRestService;
import fr.aleclerc.banana.jira.app.interceptor.ASyncBasicAuthorizationInterceptor;
import fr.aleclerc.banana.utils.RxUtils;
import io.reactivex.Single;

@Service
public class RxRestService implements IRxRestService{

	private final AsyncRestTemplate restTemplate;
	private IJiraClientConfig config;

	@Autowired
	public RxRestService(IJiraClientConfig config) {
		this.config = config;
		this.restTemplate = new AsyncRestTemplate();
		this.restTemplate.setInterceptors(
				Arrays.asList(new ASyncBasicAuthorizationInterceptor(config.getUser(), config.getPassword())));
	}

	@Override
	public <T> Single<T> get(String contextPath, Class<T> response) {
		return RxUtils.fromListenableFuture(restTemplate.getForEntity(config.getUrl() + contextPath, response));
	}
}
