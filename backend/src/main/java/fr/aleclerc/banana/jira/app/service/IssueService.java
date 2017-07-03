package fr.aleclerc.banana.jira.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.jira.api.pojo.Issue;
import fr.aleclerc.banana.jira.api.service.IIssueService;
import fr.aleclerc.banana.jira.app.response.IssueResponse;
import io.reactivex.Observable;

@Service
public class IssueService implements IIssueService{
	
	private RxRestService restService;

	@Autowired
	public IssueService(RxRestService restService) {
		this.restService = restService;
	}

	@Override
	public Observable<Issue> get(String id) {
		return null;
	}

	@Override
	public Observable<List<Issue>> getAll() {
		return null;
	}

	@Override
	public Observable<List<Issue>> getFromSprint(String boardId, String sprintId) {
		return restService.get("http://localhost:8080/rest/agile/1.0/board/" + boardId + "/sprint/"+sprintId+"/issue", IssueResponse.class)//
				.map(r -> r.getIssues());
	}

}
