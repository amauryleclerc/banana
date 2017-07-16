package fr.aleclerc.banana.jira.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.jira.api.pojo.Sprint;
import fr.aleclerc.banana.jira.api.service.IBoardService;
import fr.aleclerc.banana.jira.api.service.ISprintService;
import fr.aleclerc.banana.jira.app.response.SprintResponse;
import io.reactivex.Observable;
import io.reactivex.Single;

@Service
public class SprintService implements ISprintService {

	private RxRestService restService;
	private IBoardService boardService;

	@Autowired
	public SprintService(RxRestService restService, IBoardService boardService) {
		this.restService = restService;
		this.boardService = boardService;
	}

	@Override
	public Single<Sprint> get(String id) {
		return restService.get("/rest/agile/1.0/sprint/" + id, Sprint.class);
	}



	@Override
	public Single<List<Sprint>> getFromBoard(String boardId) {
		return restService.get("/rest/agile/1.0/board/" + boardId + "/sprint", SprintResponse.class)//
				.map(SprintResponse::getValues);
	}

}
