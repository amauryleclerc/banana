package fr.aleclerc.banana.jira.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.jira.api.pojo.Issue;
import fr.aleclerc.banana.jira.api.service.IIssueService;
import fr.aleclerc.banana.jira.app.response.IssueResponse;
import io.reactivex.Single;

@Service
public class IssueService implements IIssueService {

	private RxRestService restService;

	@Autowired
	public IssueService(RxRestService restService) {
		this.restService = restService;
	}

	@Override
	public Single<Issue> get(String id) {
		return restService.get("/rest/agile/1.0/issue/"+id, Issue.class);
	}



	@Override
	public Single<List<Issue>> getFromSprint( String sprintId) {
		return restService.get("/rest/agile/1.0/sprint/" + sprintId + "/issue", IssueResponse.class)//
				.map(IssueResponse::getIssues);
	}

}
