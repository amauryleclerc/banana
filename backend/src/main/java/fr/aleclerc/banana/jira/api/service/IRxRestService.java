package fr.aleclerc.banana.jira.api.service;

import com.fasterxml.jackson.databind.JsonNode;

import io.reactivex.Single;

public interface IRxRestService {

	<T> Single<T> get(String contextPath, Class<T> response);

	Single<JsonNode> get(String contextPath);
}
