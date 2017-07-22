package fr.aleclerc.banana.jira.app.service;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.AsyncRestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;
import fr.aleclerc.banana.jira.api.service.IRxRestService;
import fr.aleclerc.banana.jira.app.interceptor.ASyncBasicAuthorizationInterceptor;
import fr.aleclerc.banana.utils.RxUtils;
import io.reactivex.Single;

@Service
public class RxRestService implements IRxRestService {

	private final AsyncRestTemplate restTemplate;
	private IJiraClientConfig config;
	private ObjectMapper mapper;

	@Autowired
	public RxRestService(IJiraClientConfig config) {
		this.config = config;
		this.restTemplate = new AsyncRestTemplate();
		this.restTemplate.setInterceptors(Arrays.asList(new ASyncBasicAuthorizationInterceptor(config.getUser(), config.getPassword())));
		this.mapper = new ObjectMapper();
		this.mapper.findAndRegisterModules();
	}

	@Override
	public <T> Single<T> get(String contextPath, Class<T> response) {
	
		return  RxUtils.fromListenableFuture(restTemplate.getForEntity(config.getUrl() + contextPath, response));
	}

	@Override
	public Single<JsonNode> get(String contextPath) {

		return RxUtils.fromListenableFuture(restTemplate.getForEntity(config.getUrl() + contextPath, String.class))//
				.map(json -> mapper.readTree(json));

	}
}
