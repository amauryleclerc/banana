package fr.aleclerc.banana.jira.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.jira.api.pojo.Project;
import fr.aleclerc.banana.jira.api.service.IProjectService;
import io.reactivex.Observable;
@Service
public class ProjectService  implements IProjectService{
	
	private RxRestService restService;

	@Autowired
	public ProjectService(RxRestService restService) {
		this.restService = restService;
	}

	@Override
	public Observable<Project> get(String id) {
		return null;
	}

	@Override
	public Observable<List<Project>> getAll() {
		return null;
	}
	
}
