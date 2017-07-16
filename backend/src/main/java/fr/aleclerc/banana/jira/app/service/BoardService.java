package fr.aleclerc.banana.jira.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.jira.api.pojo.Board;
import fr.aleclerc.banana.jira.api.service.IBoardService;
import fr.aleclerc.banana.jira.app.response.BoardResponse;
import io.reactivex.Maybe;
import io.reactivex.Single;
@Service
public class BoardService implements IBoardService{
	
	private RxRestService restService;

	@Autowired
	public BoardService(RxRestService restService) {
		this.restService = restService;
	}

	@Override
	public Single<Board> get(String id) {
		return restService.get("/rest/agile/1.0/board/"+id, Board.class);
	}

	@Override
	public Single<List<Board>> getAll() {
		return restService.get("/rest/agile/1.0/board", BoardResponse.class)//
				.map(BoardResponse::getValues);
	}

}
