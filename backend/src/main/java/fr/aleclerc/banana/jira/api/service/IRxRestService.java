package fr.aleclerc.banana.jira.api.service;

import io.reactivex.Single;

public interface IRxRestService {

	<T> Single<T> get(String contextPath, Class<T> response);

}
