package fr.aleclerc.banana.jira.api.service;

import java.util.List;

import io.reactivex.Maybe;
import io.reactivex.Single;

public interface IJiraApiService<T> {
	
	Single<T> get(String id);
	
	
}
