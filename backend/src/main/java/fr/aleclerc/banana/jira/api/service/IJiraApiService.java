package fr.aleclerc.banana.jira.api.service;

import java.util.List;

import io.reactivex.Observable;

public interface IJiraApiService<T> {
	
	Observable<T> get(String id);
	
	Observable<List<T>> getAll();

}
