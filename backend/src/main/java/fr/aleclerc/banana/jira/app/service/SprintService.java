package fr.aleclerc.banana.jira.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.jira.api.pojo.Sprint;
import fr.aleclerc.banana.jira.api.service.ISprintService;
import fr.aleclerc.banana.jira.app.response.SprintResponse;
import io.reactivex.Observable;

@Service
public class SprintService implements ISprintService{
	
	private RxRestService restService;

	@Autowired
	public SprintService(RxRestService restService) {
		this.restService = restService;
	}

	@Override
	public Observable<Sprint> get(String id) {
		return null;
	}

	@Override
	public Observable<List<Sprint>> getAll() {
		return null;
	}

	@Override
	public Observable<List<Sprint>> getFromBoard(String boardId) {
		return restService.get("http://localhost:8080/rest/agile/1.0/board/" + boardId + "/sprint", SprintResponse.class)//
				.map(r -> r.getValues());
	}

}
