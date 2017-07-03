package fr.aleclerc.banana.jira.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.jira.api.pojo.Board;
import fr.aleclerc.banana.jira.api.service.IBoadService;
import fr.aleclerc.banana.jira.app.response.BoardResponse;
import io.reactivex.Observable;
@Service
public class BoardService implements IBoadService{
	
	private RxRestService restService;

	@Autowired
	public BoardService(RxRestService restService) {
		this.restService = restService;
	}

	@Override
	public Observable<Board> get(String id) {
		return null;
	}

	@Override
	public Observable<List<Board>> getAll() {
		return restService.get("/rest/agile/1.0/board", BoardResponse.class)//
				.map(r -> r.getValues());
	}

}
